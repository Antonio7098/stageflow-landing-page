import { Docs, loadDocs } from 'documentation-template';
import { Book, Zap, Network, Activity, Shield, Terminal } from 'lucide-react';

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


const stageflowDocsConfig = {
  name: 'Stageflow Documentation',
  description: 'A DAG-based pipeline orchestration framework for building observable, composable stage pipelines in Python',
  logo: { 
    text: 'Stageflow',
    icon: <Network className="w-5 h-5" />
  },
  navigation: [
    {
      title: 'Getting Started',
      children: [
        { title: 'Installation', href: '/docs/getting-started/installation' },
        { title: 'Quick Start', href: '/docs/getting-started/quickstart' },
        { title: 'Core Concepts', href: '/docs/getting-started/concepts' },
      ]
    },
    {
      title: 'Guides',
      children: [
        { title: 'Pipelines', href: '/docs/guides/pipelines' },
        { title: 'Stages', href: '/docs/guides/stages' },
        { title: 'Dependencies', href: '/docs/guides/dependencies' },
        { title: 'Interceptors', href: '/docs/guides/interceptors' },
        { title: 'Context', href: '/docs/guides/context' },
        { title: 'Tools', href: '/docs/guides/tools' },
        { title: 'Observability', href: '/docs/guides/observability' },
        { title: 'Authentication', href: '/docs/guides/authentication' },
        { title: 'Governance', href: '/docs/guides/governance' },
        { title: 'Enrich', href: '/docs/guides/enrich' },
        { title: 'Timestamps', href: '/docs/guides/timestamps' },
        { title: 'Releasing', href: '/docs/guides/releasing' },
        { title: 'Voice & Audio', href: '/docs/guides/voice-audio' },
        { title: 'Web Search', href: '/docs/guides/websearch' },
        { title: 'Tools Approval', href: '/docs/guides/tools-approval' },
      ]
    },
    {
      title: 'API Reference',
      children: [
        { title: 'Core', href: '/docs/api/core' },
        { title: 'Pipeline', href: '/docs/api/pipeline' },
        { title: 'Context', href: '/docs/api/context' },
        { title: 'Inputs', href: '/docs/api/inputs' },
        { title: 'Interceptors', href: '/docs/api/interceptors' },
        { title: 'Tools', href: '/docs/api/tools' },
        { title: 'Events', href: '/docs/api/events' },
        { title: 'Observability', href: '/docs/api/observability' },
        { title: 'Projector', href: '/docs/api/projector' },
        { title: 'Helpers', href: '/docs/api/helpers' },
        { title: 'Protocols', href: '/docs/api/protocols' },
        { title: 'CLI', href: '/docs/api/cli' },
        { title: 'Auth', href: '/docs/api/auth' },
        { title: 'Testing', href: '/docs/api/testing' },
        { title: 'Context Submodules', href: '/docs/api/context-submodules' },
        { title: 'Wide Events', href: '/docs/api/wide-events' },
      ]
    },
    {
      title: 'Advanced',
      children: [
        { title: 'Testing', href: '/docs/advanced/testing' },
        { title: 'Error Handling', href: '/docs/advanced/errors' },
        { title: 'Error Messages', href: '/docs/advanced/error-messages' },
        { title: 'Context Management', href: '/docs/advanced/context-management' },
        { title: 'Extensions', href: '/docs/advanced/extensions' },
        { title: 'Retry & Backoff', href: '/docs/advanced/retry-backoff' },
        { title: 'Hardening', href: '/docs/advanced/hardening' },
        { title: 'Checkpointing', href: '/docs/advanced/checkpointing' },
        { title: 'Chunking', href: '/docs/advanced/chunking' },
        { title: 'Custom Interceptors', href: '/docs/advanced/custom-interceptors' },
        { title: 'Composition', href: '/docs/advanced/composition' },
        { title: 'Subpipelines', href: '/docs/advanced/subpipelines' },
        { title: 'Saga Pattern', href: '/docs/advanced/saga-pattern' },
        { title: 'Tool Sandboxing', href: '/docs/advanced/tool-sandboxing' },
        { title: 'Idempotency', href: '/docs/advanced/idempotency' },
        { title: 'Guard Security', href: '/docs/advanced/guard-security' },
        { title: 'Routing Confidence', href: '/docs/advanced/routing-confidence' },
        { title: 'Routing Loops', href: '/docs/advanced/routing-loops' },
        { title: 'Knowledge Verification', href: '/docs/advanced/knowledge-verification' },
      ]
    },
    {
      title: 'Examples',
      children: [
        { title: 'Simple', href: '/docs/examples/simple' },
        { title: 'Chat', href: '/docs/examples/chat' },
        { title: 'Parallel', href: '/docs/examples/parallel' },
        { title: 'Transform Chain', href: '/docs/examples/transform-chain' },
        { title: 'Agent Tools', href: '/docs/examples/agent-tools' },
        { title: 'Multi-hop RAG', href: '/docs/examples/multi-hop-rag' },
        { title: 'A/B Testing', href: '/docs/examples/ab-testing' },
        { title: 'Multimodal Fusion', href: '/docs/examples/multimodal-fusion' },
        { title: 'Full Example', href: '/docs/examples/full' },
      ]
    }
  ],
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
            icon: <Network className="h-5 h-5" />,
          },
          {
            title: 'Interceptor Pattern',
            description: 'Add cross-cutting concerns like timeouts, retries, and circuit breakers without modifying stages.',
            href: '/docs/guides/interceptors',
            icon: <Shield className="h-5 h-5" />,
          },
          {
            title: 'Observable by Design',
            description: 'Structured events, correlation IDs, and built-in tracing for complete visibility.',
            href: '/docs/guides/observability',
            icon: <Activity className="h-5 h-5" />,
          },
          {
            title: 'Async-First',
            description: 'Built on asyncio for high-performance concurrent execution.',
            href: '/docs/getting-started/concepts',
            icon: <Zap className="h-5 h-5" />,
          },
          {
            title: 'Comprehensive Examples',
            description: 'From simple transforms to complex multi-agent systems.',
            href: '/docs/examples/simple',
            icon: <Terminal className="h-5 h-5" />,
          },
          {
            title: 'Zero Dependencies',
            description: 'Core library has no external dependencies. You choose your runtime.',
            href: '/docs/getting-started/installation',
            icon: <Book className="h-5 h-5" />,
          },
        ]
      }}
    />
  );
}
