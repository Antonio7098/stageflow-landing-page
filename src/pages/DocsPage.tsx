import { Docs, loadDocs } from 'documentation-template';

declare module 'import.meta' {
  interface MetaGlob {
    glob(pattern: string, options?: { query?: string; import?: string; eager?: boolean }): Record<string, unknown>;
  }
}

const modules = import.meta.glob('/stageflow-docs/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const rawDocs = loadDocs({ modules, contentPath: '/stageflow-docs' });
type DocEntry = (typeof rawDocs)[number];

function extractTitleFromContent(content: string): string | undefined {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : undefined;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripLeadingTitle(content: string, title?: string): string {
  if (!title) return content;
  const pattern = new RegExp(`^#\\s+${escapeRegExp(title)}\\s*(?:\\r?\\n)+`, 'i');
  if (pattern.test(content)) {
    return content.replace(pattern, '').trimStart();
  }
  return content;
}

const docs = rawDocs
  .map((doc: DocEntry) => {
    let slug = doc.slug.replace(/^\/+/, '/');

    if (slug.endsWith('/readme')) {
      slug = slug.replace(/\/readme$/, '');
    }

    if (slug !== '/' && slug.endsWith('/')) {
      slug = slug.slice(0, -1);
    }

    if (!slug.startsWith('/')) {
      slug = `/${slug}`;
    }

    if (slug === '') {
      slug = '/';
    }

    const title = doc.meta?.title ?? extractTitleFromContent(doc.content);
    const sanitizedContent = stripLeadingTitle(doc.content, title);

    return {
      ...doc,
      slug,
      meta: {
        ...doc.meta,
        title,
      },
      content: sanitizedContent,
    };
  })
  .sort((a: DocEntry, b: DocEntry) => {
    const priority: Record<string, number> = {
      '/': 0,
      '/getting-started/quickstart': 1,
      '/getting-started/installation': 2,
      '/getting-started/concepts': 3,
    };
    const rankA = priority[a.slug] ?? 1000;
    const rankB = priority[b.slug] ?? 1000;
    if (rankA !== rankB) {
      return rankA - rankB;
    }
    return a.slug.localeCompare(b.slug);
  });


function buildNavigation(docList: ReturnType<typeof rawDocs>): typeof stageflowDocsConfig.navigation {
  const sections: Record<string, { title: string; href: string }[]> = {};
  const order: Record<string, number> = {
    'getting-started': 1,
    'guides': 2,
    'api': 3,
    'examples': 4,
    'advanced': 5,
  };

  for (const doc of docList) {
    const match = doc.slug.match(/^\/([^/]+)\/([^/]+)$/);
    if (!match) continue;

    const [, section, page] = match;
    if (!sections[section]) {
      sections[section] = [];
    }

    const title = doc.meta?.title ?? page.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    sections[section].push({ title, href: doc.slug });
  }

  const sectionTitles: Record<string, string> = {
    'getting-started': 'Getting Started',
    'guides': 'Guides',
    'api': 'API Reference',
    'examples': 'Examples',
    'advanced': 'Advanced',
  };

  return Object.entries(sections)
    .sort(([a], [b]) => (order[a] ?? 99) - (order[b] ?? 99))
    .map(([section, children]) => ({
      title: sectionTitles[section] ?? section.charAt(0).toUpperCase() + section.slice(1),
      children: children.sort((a, b) => a.title.localeCompare(b.title)),
    }));
}


const stageflowDocsConfig = {
  name: 'Stageflow Documentation',
  description: 'A DAG-based pipeline orchestration framework for building observable, composable stage pipelines in Python',
  logo: { 
    text: 'Stageflow',
  },
  navigation: buildNavigation(docs),
  search: {
    enabled: true,
    placeholder: 'Search Stageflow documentation...'
  }
};

export function DocsPage() {
  return (
    <Docs 
      config={stageflowDocsConfig} 
      docs={docs}
      basePath="/docs"
      homePage={{
        features: [
          {
            title: 'DAG Execution',
            description: 'Stages run in parallel as soon as dependencies resolve. Maximum throughput with minimal latency.',
            href: '/docs/getting-started/concepts',
          },
          {
            title: 'Interceptor Pattern',
            description: 'Add cross-cutting concerns like timeouts, retries, and circuit breakers without modifying stages.',
            href: '/docs/guides/interceptors',
          },
          {
            title: 'Observable by Design',
            description: 'Structured events, correlation IDs, and built-in tracing for complete visibility.',
            href: '/docs/guides/observability',
          },
          {
            title: 'Async-First',
            description: 'Built on asyncio for high-performance concurrent execution.',
            href: '/docs/getting-started/concepts',
          },
          {
            title: 'Comprehensive Examples',
            description: 'From simple transforms to complex multi-agent systems.',
            href: '/docs/examples/simple',
          },
          {
            title: 'Zero Dependencies',
            description: 'Core library has no external dependencies. You choose your runtime.',
            href: '/docs/getting-started/installation',
          },
        ]
      }}
    />
  );
}
