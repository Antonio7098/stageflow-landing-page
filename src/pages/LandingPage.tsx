import {
  Github,
  Twitter,
  Linkedin,
  Zap,
  Layers,
  Shield,
  Globe,
  ArrowRight,
  Terminal,
  Cpu,
  Network,
  CheckCircle2,
  FileText,
  Settings,
  Activity,
  Code2,
} from 'lucide-react';

import {
  Section,
  SectionTitle,
  Hero,
  HeroBadge,
  HeroBackground,
  FeatureCard,
  FeatureGrid,
  FeatureShowcase,
  IconBox,
  LogoCloud,
  CodeTabs,
  CTASection,
  CTABanner,
  Navbar,
  NavButton,
  Footer,
  Container,
  GradientText,
} from 'documentation-template';

const pythonCode = `from stageflow import Pipeline, StageKind, StageOutput

class GreetStage:
    name = "greet"
    kind = StageKind.TRANSFORM

    async def execute(self, ctx):
        name = ctx.snapshot.input_text or "World"
        return StageOutput.ok(message=f"Hello, {name}!")

# Build and run the pipeline
pipeline = Pipeline().with_stage("greet", GreetStage, StageKind.TRANSFORM)
graph = pipeline.build()
results = await graph.run(ctx)`;

const pipelineCode = `from stageflow import Pipeline, StageKind

class AudioTranscribeStage:
    name = "transcribe"
    kind = StageKind.TRANSFORM

class ProfileEnrichStage:
    name = "enrich"
    kind = StageKind.ENRICH
    dependencies = ["transcribe"]

class LlmStage:
    name = "llm"
    kind = StageKind.TRANSFORM
    dependencies = ["enrich"]

class TextToSpeechStage:
    name = "tts"
    kind = StageKind.TRANSFORM
    dependencies = ["llm"]

# Fluent pipeline builder with DAG execution
pipeline = (
    Pipeline()
    .with_stage("transcribe", AudioTranscribeStage, StageKind.TRANSFORM)
    .with_stage("enrich", ProfileEnrichStage, StageKind.ENRICH, dependencies=["transcribe"])
    .with_stage("llm", LlmStage, StageKind.TRANSFORM, dependencies=["enrich"])
    .with_stage("tts", TextToSpeechStage, StageKind.TRANSFORM, dependencies=["llm"])
)

graph = pipeline.build()
await graph.run(ctx)`;

const interceptorCode = `from stageflow.interceptors import (
    TimeoutInterceptor,
    CircuitBreakerInterceptor,
    TracingInterceptor,
)
from stageflow import run_with_interceptors

# Compose interceptors for cross-cutting concerns
interceptors = [
    TimeoutInterceptor(timeout=30.0),
    CircuitBreakerInterceptor(failure_threshold=5),
    TracingInterceptor(service_name="my-pipeline"),
]

# Run with automatic before/after hooks
result = await run_with_interceptors(
    stage_name="llm",
    context=ctx,
    interceptors=interceptors,
)`;

function LogoPlaceholder({ name }: { name: string }) {
  return (
    <div className="text-base font-semibold text-muted-foreground/50 tracking-tight">
      {name}
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <CTABanner
        variant="gradient"
        action={
          <a href="/docs/getting-started/installation" className="text-white/90 hover:text-white flex items-center gap-1 text-sm font-medium">
            Read the docs <ArrowRight className="w-4 h-4" />
          </a>
        }
      >
        Stageflow - DAG-based pipeline orchestration for Python
      </CTABanner>

      <Navbar
        logo={
          <a href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <Network className="w-5 h-5 text-white" />
            </div>
            <span>Stageflow</span>
          </a>
        }
        links={[
          {
            label: 'Documentation',
            children: [
              { label: 'Getting Started', href: '/docs/getting-started/installation' },
              { label: 'API Reference', href: '/docs/getting-started/installation' },
              { label: 'Examples', href: '/docs/getting-started/installation' },
            ],
          },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <NavButton variant="ghost" href="https://github.com/Antonio7098/stageflow">
              <Github className="w-4 h-4" />
            </NavButton>
            <NavButton variant="primary" href="/docs/getting-started/installation">
              Get Started
            </NavButton>
          </div>
        }
      />

      <Hero
        size="xl"
        layout="centered"
        badge={
          <HeroBadge variant="gradient" showArrow href="/docs/getting-started/installation">
            Python 3.11+ Required
          </HeroBadge>
        }
        title="Build Complex Pipelines"
        titleGradient="With Confidence"
        titleGradientPreset="cyan-blue"
        subtitle="A DAG-based pipeline orchestration framework for building observable, composable stage pipelines in Python. Separates orchestration from business logic for maintainable, testable systems."
        actions={[
          {
            label: 'Install Stageflow',
            href: '/docs/getting-started/installation',
            variant: 'primary',
          },
          {
            label: 'Read the Docs',
            href: '/docs/getting-started/installation',
            variant: 'ghost',
            icon: <ArrowRight className="w-4 h-4" />,
            iconPosition: 'right',
          },
        ]}
        backgroundElement={
          <HeroBackground variant="radial" primaryColor="rgba(6, 182, 212, 0.08)" secondaryColor="rgba(168, 85, 247, 0.08)" />
        }
      />

      <LogoCloud
        title="Built for"
        variant="muted"
        logos={[
          { name: 'AI Pipelines', logo: <LogoPlaceholder name="AI Pipelines" /> },
          { name: 'Data Processing', logo: <LogoPlaceholder name="Data Processing" /> },
          { name: 'Workflow Automation', logo: <LogoPlaceholder name="Workflow Automation" /> },
          { name: 'Microservices', logo: <LogoPlaceholder name="Microservices" /> },
          { name: 'ETL Systems', logo: <LogoPlaceholder name="ETL Systems" /> },
        ]}
      />

      <Section theme="dark" spacing="xl">
        <div className="container mx-auto px-4">
          <SectionTitle
            label="Simple to Start"
            labelGradient="cyan-blue"
            title="Define pipelines with a fluent builder"
            align="center"
            className="mb-16"
            titleClassName="text-white"
          />

          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <div>
              <p className="text-lg text-gray-400 mb-8">
                Stageflow provides a clean, type-safe interface for building complex pipeline architectures. Define stages, set dependencies, and let the framework handle execution.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <NavButton variant="primary" href="/docs/getting-started/installation">
                  Read the Docs
                </NavButton>
                <NavButton variant="ghost" href="https://github.com/Antonio7098/stageflow" icon={<Github className="w-4 h-4" />}>
                  View on GitHub
                </NavButton>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  {
                    icon: <Network className="w-5 h-5" />,
                    title: 'DAG Execution',
                    description: 'Stages run as soon as dependencies resolve',
                  },
                  {
                    icon: <Terminal className="w-5 h-5" />,
                    title: 'Type-Safe',
                    description: 'Full IDE support and compile-time safety',
                  },
                  {
                    icon: <Zap className="w-5 h-5" />,
                    title: 'Async-First',
                    description: 'Built on asyncio for high performance',
                  },
                  {
                    icon: <Activity className="w-5 h-5" />,
                    title: 'Observable',
                    description: 'Events, tracing, and metrics built-in',
                  },
                  {
                    icon: <Shield className="w-5 h-5" />,
                    title: 'Composable',
                    description: 'Share stages and build complex workflows',
                  },
                  {
                    icon: <Settings className="w-5 h-5" />,
                    title: 'Extensible',
                    description: 'Protocols for persistence and config',
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <IconBox
                      icon={feature.icon}
                      variant="outlined"
                      color="cyan"
                      size="md"
                    />
                    <div>
                      <h4 className="font-medium text-white">{feature.title}</h4>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <CodeTabs
                tabs={[
                  { label: 'Basic', code: pythonCode, language: 'python' },
                  { label: 'Pipeline', code: pipelineCode, language: 'python' },
                  { label: 'Interceptors', code: interceptorCode, language: 'python' },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      <FeatureShowcase
        label="Core Philosophy"
        labelGradient="purple-blue"
        title={
          <>
            Orchestration vs. Business Logic<br />
            <span className="text-muted-foreground">(A clear separation)</span>
          </>
        }
        description="Stageflow separates the concerns of orchestration (timeouts, retries, telemetry, cancellation) from business logic (agents, tools, enrichers). This makes your code testable, maintainable, and observable."
        layout="right"
        action={
          <NavButton variant="primary" href="/docs/getting-started/concepts">
            Learn About Architecture
          </NavButton>
        }
        features={[
          {
            icon: <Layers className="w-5 h-5" />,
            title: 'Stages own orchestration',
            description: 'Timeouts, retries, circuit breakers, and telemetry are handled by the framework',
          },
          {
            icon: <Globe className="w-5 h-5" />,
            title: 'Protocol-based extension',
            description: 'Clean abstractions for persistence, configuration, and event handling',
          },
          {
            icon: <CheckCircle2 className="w-5 h-5" />,
            title: 'Immutable data flow',
            description: 'Context snapshots are frozen. No side effects on shared state',
          },
        ]}
        media={
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
            <div className="relative bg-card border border-border rounded-2xl p-6 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm text-muted-foreground ml-2">pipeline.py</span>
                </div>
                <div className="font-mono text-sm space-y-2">
                  <div className="text-gray-400"># Stage definition</div>
                  <div><span className="text-purple-400">class</span> <span className="text-blue-400">GreetStage</span>:</div>
                  <div className="pl-4">name = <span className="text-green-400">"greet"</span></div>
                  <div className="pl-4">kind = StageKind.TRANSFORM</div>
                  <div className="pl-4 text-gray-400"># Business logic only</div>
                  <div className="pl-4"><span className="text-purple-400">async def</span> execute(self, ctx):</div>
                  <div className="pl-8">...</div>
                </div>
              </div>
            </div>
          </div>
        }
      />

      <FeatureGrid
        label="Everything You Need"
        labelGradient="pink-purple"
        title="Build production-ready pipelines"
        subtitle="From simple transforms to complex multi-agent systems, Stageflow provides the building blocks you need."
        columns={3}
        className="bg-muted/30"
      >
        {[
          {
            icon: <Network className="w-5 h-5" />,
            title: 'DAG Execution',
            description: 'Stages execute in parallel as soon as dependencies resolve. Maximum throughput, minimum latency.',
          },
          {
            icon: <Zap className="w-5 h-5" />,
            title: 'Interceptor Middleware',
            description: 'Add cross-cutting concerns like auth, timeouts, circuit breakers without modifying stages.',
          },
          {
            icon: <Activity className="w-5 h-5" />,
            title: 'Built-in Observability',
            description: 'Structured events, correlation IDs, tracing, and metrics out of the box.',
          },
          {
            icon: <Cpu className="w-5 h-5" />,
            title: 'Tool Execution',
            description: 'First-class support for agent tools with undo, approval, and behavior gating.',
          },
          {
            icon: <Shield className="w-5 h-5" />,
            title: 'Cancellation Support',
            description: 'Graceful pipeline cancellation with proper cleanup and resource release.',
          },
          {
            icon: <FileText className="w-5 h-5" />,
            title: 'Zero Dependencies',
            description: 'Core library has no external dependencies. Choose your own async runtime.',
          },
        ].map((feature, index) => (
          <FeatureCard
            key={index}
            icon={<IconBox icon={feature.icon} variant="gradient" color="purple" />}
            title={feature.title}
            description={feature.description}
            variant="bordered"
          />
        ))}
      </FeatureGrid>

      <CTASection
        variant="card"
        title="Ready to build pipelines?"
        description="Get started with Stageflow today and see how easy it is to build observable, composable pipelines."
        gradient="cyan-blue"
        actions={[
          { label: 'pip install stageflow', href: '/docs/getting-started/installation', variant: 'primary' },
          { label: 'Read the Docs', href: '/docs/getting-started/installation', variant: 'outline' },
        ]}
      />

      <Footer
        logo={
          <a href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <Network className="w-5 h-5 text-white" />
            </div>
            <span>Stageflow</span>
          </a>
        }
        description="A DAG-based pipeline orchestration framework for building observable, composable stage pipelines in Python."
        sections={[
          {
            title: 'Product',
            links: [
              { label: 'Features', href: '/#features' },
              { label: 'Getting Started', href: '/docs/getting-started/installation' },
              { label: 'Examples', href: '/docs/getting-started/installation' },
            ],
          },
          {
            title: 'Resources',
            links: [
              { label: 'Documentation', href: '/docs/getting-started/installation' },
              { label: 'API Reference', href: '/docs/getting-started/installation' },
              { label: 'GitHub', href: 'https://github.com/Antonio7098/stageflow' },
            ],
          },
          {
            title: 'Community',
            links: [
              { label: 'GitHub', href: 'https://github.com/Antonio7098/stageflow' },
              { label: 'Issues', href: 'https://github.com/Antonio7098/stageflow/issues' },
            ],
          },
        ]}
        socialLinks={[
          { label: 'GitHub', href: 'https://github.com/Antonio7098/stageflow', icon: <Github className="w-5 h-5" /> },
        ]}
        copyright={`© ${new Date().getFullYear()} Stageflow. Open source under MIT License.`}
        bottomLinks={[
          { label: 'License', href: 'https://github.com/Antonio7098/stageflow/blob/main/LICENSE' },
        ]}
      />
    </div>
  );
}

export default LandingPage;
