import type { NewsArticle } from '../types'

export const mockNews: NewsArticle[] = [
  {
    id: 'n1',
    title: 'RBI keeps repo rate unchanged, signals calibrated liquidity support',
    deck: 'A pause on rates, paired with targeted liquidity signals, keeps borrowing conditions stable while preserving optionality for the next policy cycle.',
    source: 'ET Markets',
    url: 'https://economictimes.indiatimes.com/markets/rbi-repo-rate-liquidity-support',
    publishedAt: '2026-03-29T09:00:00Z',
    category: 'Economy',
    tags: ['RBI', 'Interest Rates', 'Banking'],
    topic: 'Monetary Policy Outlook',
    entities: ['RBI', 'Banks', 'Borrowers'],
    content:
      'The Reserve Bank of India held the repo rate while signaling targeted liquidity support for productive sectors. Analysts expect borrowing costs to stay range-bound in the near term, with selective credit growth in housing and MSME lending. Markets interpreted the tone as supportive but cautious amid global volatility.',
    evidence: [
      {
        label: 'Rate decision',
        value: 'Repo rate remained unchanged, limiting immediate repricing pressure across loans and deposits.',
      },
      {
        label: 'Liquidity cue',
        value: 'The central bank signaled calibrated support for productive sectors rather than broad easing.',
      },
      {
        label: 'Commercial implication',
        value: 'Housing and MSME lending are the earliest segments where transmission could show up.',
      },
    ],
    relatedCoverage: [
      {
        date: '2026-03-21',
        headline: 'Bond traders trim easing bets ahead of RBI policy week',
        source: 'ET Markets',
        takeaway: 'Expectations shifted from an imminent cut to a hold-with-guidance setup.',
        url: 'https://economictimes.indiatimes.com/markets/rbi-policy-week-bond-traders',
      },
      {
        date: '2026-03-25',
        headline: 'Banks prepare for slower deposit repricing as macro volatility rises',
        source: 'ET BFSI',
        takeaway: 'Treasury teams positioned for sticky rates and selective credit expansion.',
        url: 'https://economictimes.indiatimes.com/industry/banking/deposit-repricing-macro-volatility',
      },
    ],
  },
  {
    id: 'n2',
    title: 'Indian SaaS startups see stronger enterprise deal flow in Q1',
    deck: 'Enterprise demand is improving, but buyers are rewarding efficiency and retention, not just AI positioning alone.',
    source: 'ET Prime',
    url: 'https://economictimes.indiatimes.com/prime/technology-and-startups/indian-saas-enterprise-deal-flow-q1',
    publishedAt: '2026-03-29T08:20:00Z',
    category: 'Startups',
    tags: ['SaaS', 'Startups', 'Enterprise'],
    topic: 'B2B SaaS Growth',
    entities: ['SaaS Founders', 'Enterprise Buyers', 'VC Funds'],
    content:
      'Multiple Indian SaaS companies reported stronger enterprise pipelines, with faster conversion cycles in mid-market segments. Founders credit AI-enabled product workflows and improved customer success playbooks. Investors remain selective, prioritizing capital-efficient growth and net revenue retention trends.',
    evidence: [
      {
        label: 'Demand signal',
        value: 'Enterprise pipelines improved, especially in the mid-market where deal velocity increased.',
      },
      {
        label: 'Why now',
        value: 'AI-enabled workflows and stronger customer success execution are shortening conversions.',
      },
      {
        label: 'Investor filter',
        value: 'Capital-efficient growth and net revenue retention still matter more than headline buzz.',
      },
    ],
    relatedCoverage: [
      {
        date: '2026-03-16',
        headline: 'Mid-market SaaS buyers reopen automation budgets after cautious 2025',
        source: 'ET CIO',
        takeaway: 'Budget unlocks began with ROI-led pilots rather than multi-year platform bets.',
        url: 'https://economictimes.indiatimes.com/tech/mid-market-saas-buyers-automation-budgets',
      },
      {
        date: '2026-03-24',
        headline: 'VC firms push SaaS founders to show retention before expansion',
        source: 'ET Prime',
        takeaway: 'Growth capital is available, but only when post-sales quality is visible in metrics.',
        url: 'https://economictimes.indiatimes.com/prime/startups/vc-saas-retention-before-expansion',
      },
    ],
  },
  {
    id: 'n3',
    title: 'Semiconductor and AI infrastructure stocks lead weekly tech rally',
    deck: 'The market is rewarding companies tied to compute capacity, but leadership is narrowing toward names with visible execution and balance-sheet discipline.',
    source: 'ET Tech',
    url: 'https://economictimes.indiatimes.com/tech/semiconductor-ai-infrastructure-rally',
    publishedAt: '2026-03-28T15:45:00Z',
    category: 'Tech',
    tags: ['AI', 'Semiconductors', 'Markets'],
    topic: 'AI Infrastructure Cycle',
    entities: ['Chipmakers', 'Cloud Providers', 'Data Centers'],
    content:
      'Technology stocks linked to AI infrastructure outperformed this week as capacity expansion plans accelerated. Analysts cite persistent demand for compute and networking hardware. Valuation dispersion widened, with fundamentals and execution quality becoming key differentiators for stock selection.',
    evidence: [
      {
        label: 'Market move',
        value: 'AI infrastructure names outperformed over the week as capacity plans accelerated.',
      },
      {
        label: 'Demand driver',
        value: 'Demand remains strongest in compute and networking hardware, not across the whole stack.',
      },
      {
        label: 'Risk filter',
        value: 'Valuation gaps widened, so execution quality matters more than thematic momentum alone.',
      },
    ],
    relatedCoverage: [
      {
        date: '2026-03-18',
        headline: 'Cloud operators signal another round of AI data center capex',
        source: 'ET Tech',
        takeaway: 'Infrastructure demand looked durable because hyperscalers kept spending guidance elevated.',
        url: 'https://economictimes.indiatimes.com/tech/cloud-operators-ai-data-center-capex',
      },
      {
        date: '2026-03-26',
        headline: 'Brokerages split on chip names as multiples outrun parts of the cycle',
        source: 'ET Markets',
        takeaway: 'The theme stayed strong, but analysts began separating quality operators from speculative beneficiaries.',
        url: 'https://economictimes.indiatimes.com/markets/brokerages-chip-names-multiples-cycle',
      },
    ],
  },
  {
    id: 'n4',
    title: 'Union Budget follow-up: capex push may reshape logistics and industrial demand',
    deck: 'Budget allocations are starting to look operational rather than symbolic, with order-book implications for logistics, EPC, and industrial suppliers.',
    source: 'ET Bureau',
    url: 'https://economictimes.indiatimes.com/news/economy/policy/budget-capex-logistics-industrial-demand',
    publishedAt: '2026-03-27T12:10:00Z',
    category: 'Policy',
    tags: ['Budget', 'Capex', 'Infrastructure'],
    topic: 'Infrastructure-Led Growth',
    entities: ['Government', 'Infra Firms', 'Manufacturers'],
    content:
      'Post-budget allocations indicate sustained public capex in transport, rail, and urban infrastructure. Industry executives expect improved order books for EPC and industrial suppliers, though execution speed and state-level coordination remain key variables for near-term demand conversion.',
    evidence: [
      {
        label: 'Policy follow-through',
        value: 'Capex spending signals are extending beyond headline announcements into sector-level allocations.',
      },
      {
        label: 'Commercial effect',
        value: 'Logistics, EPC, and industrial suppliers could see healthier order books if execution remains on track.',
      },
      {
        label: 'Constraint',
        value: 'State-level coordination and project speed are the swing factors for near-term conversion.',
      },
    ],
    relatedCoverage: [
      {
        date: '2026-03-12',
        headline: 'Transport ministry front-loads project approvals after budget allocations',
        source: 'ET Infrastructure',
        takeaway: 'Early administrative moves suggested faster translation from budget headline to tender pipeline.',
        url: 'https://economictimes.indiatimes.com/news/economy/infrastructure/transport-ministry-project-approvals',
      },
      {
        date: '2026-03-23',
        headline: 'Industrial suppliers flag stronger enquiry volume tied to rail and urban projects',
        source: 'ET Industry',
        takeaway: 'Private suppliers started seeing demand intent, though revenue timing still depended on execution pace.',
        url: 'https://economictimes.indiatimes.com/industry/industrial-suppliers-rail-urban-projects',
      },
    ],
  },
  {
    id: 'n5',
    title: 'NSE midcap index hits fresh high as domestic flows stay resilient',
    deck: 'Domestic liquidity continues to cushion volatility, but breadth quality is becoming a bigger selection factor than momentum alone.',
    source: 'ET Markets',
    url: 'https://economictimes.indiatimes.com/markets/stocks/news/nse-midcap-index-domestic-flows',
    publishedAt: '2026-03-29T10:30:00Z',
    category: 'Markets',
    tags: ['NSE', 'Midcap', 'Domestic Flows'],
    topic: 'Domestic Liquidity Momentum',
    entities: ['Retail Investors', 'Mutual Funds', 'Midcap Companies'],
    content:
      'India’s midcap benchmark extended gains as domestic institutions continued systematic buying despite mixed global cues. Analysts said leadership is rotating toward earnings-consistent names rather than pure momentum counters. Portfolio managers cautioned that stretched pockets still require valuation discipline.',
    evidence: [
      {
        label: 'Flow support',
        value: 'Domestic systematic inflows remained steady and offset global risk-off intervals.',
      },
      {
        label: 'Leadership shift',
        value: 'Earnings visibility is increasingly deciding which midcaps keep outperforming.',
      },
      {
        label: 'Risk signal',
        value: 'Valuation dispersion widened, making stock-level selection critical.',
      },
    ],
    relatedCoverage: [
      {
        date: '2026-03-20',
        headline: 'SIP inflows hold near highs as retail participation broadens',
        source: 'ET Mutual Funds',
        takeaway: 'Retail money stayed sticky and continued to support risk assets.',
        url: 'https://economictimes.indiatimes.com/mf/sip-inflows-hold-near-highs',
      },
      {
        date: '2026-03-26',
        headline: 'Broker notes flag selective froth in momentum-heavy midcaps',
        source: 'ET Markets',
        takeaway: 'Rotation toward quality names began as valuations stretched.',
        url: 'https://economictimes.indiatimes.com/markets/midcap-froth-broker-notes',
      },
    ],
  },
  {
    id: 'n6',
    title: 'UPI merchants see higher ticket sizes after credit-on-UPI expansion',
    deck: 'Digital payments are moving from volume scale to monetization quality as credit-linked usage deepens.',
    source: 'ET BFSI',
    url: 'https://economictimes.indiatimes.com/industry/banking/finance/banking/upi-credit-ticket-size-merchants',
    publishedAt: '2026-03-28T11:30:00Z',
    category: 'Economy',
    tags: ['UPI', 'Fintech', 'Credit'],
    topic: 'Digital Payments Monetization',
    entities: ['Merchants', 'Banks', 'Fintech Platforms'],
    content:
      'Merchants across urban and tier-2 clusters reported improving average order value as credit-on-UPI options became more visible at checkout. Banks see this as a low-friction acquisition channel for younger users. Analysts said underwriting discipline and fraud controls remain central to sustainability.',
    evidence: [
      {
        label: 'Merchant impact',
        value: 'Average ticket sizes rose where credit-on-UPI was prominently offered.',
      },
      {
        label: 'Bank strategy',
        value: 'Lenders are using payment rails for customer acquisition and behavior insights.',
      },
      {
        label: 'Execution risk',
        value: 'Credit quality and fraud controls will define long-term economics.',
      },
    ],
    relatedCoverage: [
      {
        date: '2026-03-17',
        headline: 'NPCI data shows sustained growth in merchant UPI transactions',
        source: 'ET Data Desk',
        takeaway: 'Merchant acceptance continued widening beyond metros.',
        url: 'https://economictimes.indiatimes.com/markets/npci-merchant-upi-growth',
      },
      {
        date: '2026-03-24',
        headline: 'Banks sharpen risk controls for new-age small-ticket credit flows',
        source: 'ET BFSI',
        takeaway: 'Risk guardrails are becoming a strategic differentiator.',
        url: 'https://economictimes.indiatimes.com/industry/banking/risk-controls-small-ticket-credit',
      },
    ],
  },
  {
    id: 'n7',
    title: 'India EV supply chain sees fresh localization push from tier-1 suppliers',
    deck: 'Localization momentum is shifting from assembly to component depth, with margin and resilience implications for manufacturers.',
    source: 'ET Auto',
    url: 'https://economictimes.indiatimes.com/industry/auto/ev-supply-chain-localization-tier1',
    publishedAt: '2026-03-27T10:45:00Z',
    category: 'Policy',
    tags: ['EV', 'Manufacturing', 'Supply Chain'],
    topic: 'EV Localization Strategy',
    entities: ['Auto OEMs', 'Tier-1 Suppliers', 'State Governments'],
    content:
      'Auto component suppliers announced new localization programs tied to battery systems, power electronics, and drivetrain modules. Industry leaders said localization can reduce import volatility and improve delivery reliability. Policy incentives and state-level execution speed remain key to scaling outcomes.',
    evidence: [
      {
        label: 'Supply move',
        value: 'Component-level localization plans expanded beyond final assembly efforts.',
      },
      {
        label: 'Business upside',
        value: 'Lower import dependence can improve margin predictability for OEMs.',
      },
      {
        label: 'Policy dependency',
        value: 'Incentive continuity and execution quality still control pace of rollout.',
      },
    ],
    relatedCoverage: [
      {
        date: '2026-03-15',
        headline: 'State EV clusters compete for battery ecosystem investments',
        source: 'ET Infrastructure',
        takeaway: 'Cluster economics and permitting speed emerged as differentiators.',
        url: 'https://economictimes.indiatimes.com/news/economy/ev-clusters-battery-investments',
      },
      {
        date: '2026-03-23',
        headline: 'OEMs seek multi-sourcing to reduce EV component bottlenecks',
        source: 'ET Auto',
        takeaway: 'Resilience strategy widened vendor networks across key parts.',
        url: 'https://economictimes.indiatimes.com/industry/auto/ev-multi-sourcing-component-bottlenecks',
      },
    ],
  },
  {
    id: 'n8',
    title: 'Cybersecurity startups raise fresh growth rounds as enterprise demand expands',
    deck: 'Security budgets are becoming less discretionary as AI-era risk surfaces widen across cloud and identity layers.',
    source: 'ET Startup',
    url: 'https://economictimes.indiatimes.com/tech/startups/cybersecurity-startups-growth-rounds',
    publishedAt: '2026-03-29T07:55:00Z',
    category: 'Startups',
    tags: ['Cybersecurity', 'Funding', 'Enterprise'],
    topic: 'Security-First SaaS Momentum',
    entities: ['Security Startups', 'Enterprise CISOs', 'Growth Investors'],
    content:
      'A cluster of cybersecurity startups announced growth rounds as enterprise procurement cycles accelerated for identity, endpoint, and cloud posture tools. Investors said category depth and net retention quality are central to valuation. Buyers now prioritize integrated stacks over fragmented point products.',
    evidence: [
      {
        label: 'Funding signal',
        value: 'Multiple security-focused startups closed growth rounds in a short window.',
      },
      {
        label: 'Demand behavior',
        value: 'Enterprise buyers accelerated procurement for core risk-control categories.',
      },
      {
        label: 'Selection filter',
        value: 'Integrated platform depth and retention quality are now key valuation drivers.',
      },
    ],
    relatedCoverage: [
      {
        date: '2026-03-19',
        headline: 'CISOs increase spend on identity and cloud posture controls',
        source: 'ET CIO',
        takeaway: 'Security budgets shifted toward preventive architecture upgrades.',
        url: 'https://economictimes.indiatimes.com/tech/ciso-spend-identity-cloud-posture',
      },
      {
        date: '2026-03-27',
        headline: 'Growth investors back retention-led SaaS security models',
        source: 'ET Prime',
        takeaway: 'Capital favored revenue durability over pure growth headlines.',
        url: 'https://economictimes.indiatimes.com/prime/startups/retention-led-saas-security-models',
      },
    ],
  },
  {
    id: 'n9',
    title: 'India’s pharma exports gain from specialty pipeline expansion in US markets',
    deck: 'Export momentum is improving where companies move up the value chain from commoditized molecules to specialty portfolios.',
    source: 'ET Pharma',
    url: 'https://economictimes.indiatimes.com/industry/healthcare/pharma/pharma-exports-specialty-pipeline-us',
    publishedAt: '2026-03-26T14:05:00Z',
    category: 'Markets',
    tags: ['Pharma', 'Exports', 'US Market'],
    topic: 'Specialty Pharma Expansion',
    entities: ['Indian Pharma Firms', 'US Buyers', 'Regulators'],
    content:
      'Leading drugmakers reported stronger order visibility in select specialty categories in the US market. Management teams said differentiated filings and manufacturing compliance upgrades supported better pricing resilience. Analysts warned that regulatory execution remains the core gating factor.',
    evidence: [
      {
        label: 'Revenue setup',
        value: 'Specialty portfolios showed stronger order visibility than commoditized product lines.',
      },
      {
        label: 'Margin support',
        value: 'Pricing resilience improved where differentiation and compliance were stronger.',
      },
      {
        label: 'Critical risk',
        value: 'Regulatory timelines continue to determine speed and sustainability of gains.',
      },
    ],
    relatedCoverage: [
      {
        date: '2026-03-11',
        headline: 'FDA compliance upgrades become capex priority for top exporters',
        source: 'ET Pharma',
        takeaway: 'Compliance investments were positioned as growth enablers, not just checklists.',
        url: 'https://economictimes.indiatimes.com/industry/pharma/fda-compliance-upgrades-capex-priority',
      },
      {
        date: '2026-03-22',
        headline: 'Brokerages prefer specialty-led pharma names amid pricing pressure',
        source: 'ET Markets',
        takeaway: 'Street preferences tilted toward differentiated export portfolios.',
        url: 'https://economictimes.indiatimes.com/markets/pharma-specialty-led-preference',
      },
    ],
  },
  {
    id: 'n10',
    title: 'Cloud cost optimization tools see renewed enterprise adoption across India Inc.',
    deck: 'Enterprises are prioritizing AI-era cloud efficiency, opening room for tooling that ties spend controls to engineering workflows.',
    source: 'ET Tech',
    url: 'https://economictimes.indiatimes.com/tech/cloud/cloud-cost-optimization-enterprise-adoption',
    publishedAt: '2026-03-28T09:10:00Z',
    category: 'Tech',
    tags: ['Cloud', 'AI', 'Enterprise'],
    topic: 'Cloud FinOps Acceleration',
    entities: ['CIO Teams', 'Engineering Leaders', 'FinOps Platforms'],
    content:
      'Large enterprises accelerated adoption of cloud optimization layers as AI workloads increased baseline infrastructure spend. Technology leaders said visibility and allocation controls are moving into weekly operating cadence. Vendors with actionable policy engines and developer integration saw stronger adoption.',
    evidence: [
      {
        label: 'Adoption pattern',
        value: 'Cloud optimization tools moved from periodic audits to continuous operations.',
      },
      {
        label: 'Demand trigger',
        value: 'AI workloads raised urgency around spend governance and accountability.',
      },
      {
        label: 'Vendor edge',
        value: 'Tools tied to developer workflows gained preference over dashboard-only offerings.',
      },
    ],
    relatedCoverage: [
      {
        date: '2026-03-13',
        headline: 'CIO survey shows cost visibility as top cloud modernization blocker',
        source: 'ET CIO',
        takeaway: 'Leaders cited governance lag as the main constraint to AI scaling.',
        url: 'https://economictimes.indiatimes.com/tech/cio-survey-cloud-cost-visibility-blocker',
      },
      {
        date: '2026-03-25',
        headline: 'FinOps teams move to weekly review cycles as AI spend ramps',
        source: 'ET Tech',
        takeaway: 'Operational cadence tightened to keep cloud budgets predictable.',
        url: 'https://economictimes.indiatimes.com/tech/finops-weekly-reviews-ai-spend',
      },
    ],
  },
  {
    id: 'n11',
    title: 'Retail inflation eases for second month, but food volatility remains elevated',
    deck: 'Macro comfort is improving, yet food-price uncertainty keeps policy and household planning cautious.',
    source: 'ET Economy',
    url: 'https://economictimes.indiatimes.com/news/economy/indicators/retail-inflation-food-volatility',
    publishedAt: '2026-03-27T18:20:00Z',
    category: 'Economy',
    tags: ['Inflation', 'CPI', 'Food Prices'],
    topic: 'Inflation Trajectory',
    entities: ['Households', 'RBI', 'Consumer Businesses'],
    content:
      'Headline retail inflation softened for a second consecutive month, helped by moderation in selected core categories. Economists noted that food-price spikes continue to create uncertainty in near-term trajectories. Policy messaging is likely to remain data-dependent until volatility normalizes.',
    evidence: [
      {
        label: 'Macro signal',
        value: 'Headline inflation moderated for the second month in a row.',
      },
      {
        label: 'Open risk',
        value: 'Food-category volatility still adds uncertainty to policy and consumer planning.',
      },
      {
        label: 'Policy implication',
        value: 'Rate-path communication is likely to remain cautious and data-dependent.',
      },
    ],
    relatedCoverage: [
      {
        date: '2026-03-14',
        headline: 'Urban consumption trends improve as core inflation cools',
        source: 'ET Economy',
        takeaway: 'Lower core pressure supported selective demand recovery.',
        url: 'https://economictimes.indiatimes.com/news/economy/core-inflation-cools-urban-consumption',
      },
      {
        date: '2026-03-24',
        headline: 'Food basket swings keep inflation forecasters on guard',
        source: 'ET Data Desk',
        takeaway: 'Volatile categories remained the biggest forecasting challenge.',
        url: 'https://economictimes.indiatimes.com/news/economy/food-basket-swings-inflation-forecasters',
      },
    ],
  },
  {
    id: 'n12',
    title: 'AI hiring in product and data roles rebounds across startup and enterprise cohorts',
    deck: 'Hiring momentum is returning in targeted AI roles as companies shift from experimentation to deployment.',
    source: 'ET Careers',
    url: 'https://economictimes.indiatimes.com/jobs/ai-hiring-product-data-rebound',
    publishedAt: '2026-03-28T13:40:00Z',
    category: 'Startups',
    tags: ['AI', 'Hiring', 'Product'],
    topic: 'AI Talent Demand',
    entities: ['Startup Founders', 'Enterprise Tech Teams', 'Job Seekers'],
    content:
      'Recruiters reported stronger demand for AI product managers, data engineers, and applied ML profiles as firms moved from pilot-stage experimentation to deployment. Hiring is concentrated in roles with measurable business outcomes. Compensation structures are increasingly tied to execution milestones rather than title inflation.',
    evidence: [
      {
        label: 'Demand shift',
        value: 'Hiring moved from exploratory roles to deployment-focused functional ownership.',
      },
      {
        label: 'Role concentration',
        value: 'Product, data engineering, and applied ML profiles saw the clearest rebound.',
      },
      {
        label: 'Execution bias',
        value: 'Compensation became more milestone-linked and outcomes-driven.',
      },
    ],
    relatedCoverage: [
      {
        date: '2026-03-10',
        headline: 'Enterprises define AI deployment playbooks for 2026 operating plans',
        source: 'ET Tech',
        takeaway: 'Operationalization plans started converting into specific hiring mandates.',
        url: 'https://economictimes.indiatimes.com/tech/enterprise-ai-deployment-playbooks-2026',
      },
      {
        date: '2026-03-22',
        headline: 'Startups prioritize AI roles linked to clear revenue or retention outcomes',
        source: 'ET Startup',
        takeaway: 'Role creation followed business-case clarity over experimentation hype.',
        url: 'https://economictimes.indiatimes.com/tech/startups/ai-roles-revenue-retention-outcomes',
      },
    ],
  },
]
