// ============================================
// Userlenz Mock Data
// ============================================

export const templates = [
    {
        id: 't1', name: 'Usability testing a new product', category: 'prototype',
        description: 'Test your new product with real users to identify usability issues before launch.',
        blocks: ['Welcome', 'Task', 'Opinion Scale', 'Open Question', 'Yes/No', 'Open Question', 'Thank You'],
        gain: ['Uncover usability issues', 'Understand user expectations', 'See real user behavior']
    },
    {
        id: 't2', name: 'Run an early prototype test', category: 'prototype',
        description: 'Validate your early-stage prototype by testing navigation, interactions, and comprehension.',
        blocks: ['Welcome', 'Task', 'Opinion Scale', 'Multiple Choice', 'Open Question', 'Thank You'],
        gain: ['Validate prototype interactions', 'Identify navigation issues', 'Get early feedback']
    },
    {
        id: 't3', name: 'Feature discoverability template', category: 'prototype',
        description: 'Evaluate whether users can naturally find and understand key features in your product.',
        blocks: ['Welcome', 'Task', 'Yes/No', 'Opinion Scale', 'Open Question', 'Thank You'],
        gain: ['Test feature visibility', 'Understand user mental models', 'Optimize feature placement']
    },
    {
        id: 't4', name: 'Collect insights on features', category: 'prototype',
        description: 'Gather qualitative feedback on specific features to guide improvement decisions.',
        blocks: ['Welcome', 'Context Screen', 'Task', 'Opinion Scale', 'Open Question', 'Open Question', 'Thank You'],
        gain: ['Understand feature perception', 'Collect improvement ideas', 'Prioritize feature work']
    },
    {
        id: 't5', name: 'Test feature usability', category: 'prototype',
        description: 'Measure how easy it is for users to use a specific feature and where they struggle.',
        blocks: ['Welcome', 'Task', 'Opinion Scale', 'Multiple Choice', 'Open Question', 'Thank You'],
        gain: ['Measure feature ease of use', 'Find friction points', 'Get targeted feedback']
    },
    {
        id: 't6', name: 'Test mobile app usability', category: 'prototype',
        description: 'Run a usability test optimized for mobile app flows and interactions.',
        blocks: ['Welcome', 'Task', 'Opinion Scale', 'Yes/No', 'Open Question', 'Open Question', 'Thank You'],
        gain: ['Test mobile interactions', 'Verify touch targets', 'Assess mobile navigation']
    },
    {
        id: 't7', name: 'Validate live website sign-up funnel', category: 'live-web',
        description: "Test your live website's sign-up funnel to find drop-off causes and conversion blockers.",
        blocks: ['Welcome', 'Task', 'Opinion Scale', 'Yes/No', 'Open Question', 'Open Question', 'Thank You'],
        gain: ['Find conversion blockers', 'Optimize sign-up flow', 'Reduce drop-offs']
    },
    {
        id: 't8', name: 'Test live website navigation', category: 'live-web',
        description: 'Evaluate how effectively users navigate your live website to find key information.',
        blocks: ['Welcome', 'Task', 'Opinion Scale', 'Multiple Choice', 'Open Question', 'Yes/No', 'Open Question', 'Open Question', 'Open Question', 'Thank You'],
        gain: ['Test information architecture', 'Check findability', 'See real user behavior']
    },
    {
        id: 't9', name: 'Test your website sign-up flow', category: 'live-web',
        description: 'Understand how users experience your website sign-up process from start to finish.',
        blocks: ['Welcome', 'Task', 'Opinion Scale', 'Multiple Choice', 'Open Question', 'Yes/No', 'Open Question', 'Open Question', 'Open Question', 'Thank You'],
        gain: ['Evaluate sign-up experience', 'Test terminology clarity', 'Capture user behavior']
    },
    {
        id: 't10', name: 'Run a Single Ease Question (SEQ) test', category: 'prototype',
        description: 'Collect fast, quantitative feedback on task difficulty using the SEQ methodology.',
        blocks: ['Welcome', 'Context Screen', 'Task', 'Opinion Scale', 'Thank You'],
        gain: ['Spot usability issues', 'Track usability over time', 'Make confident decisions']
    },
    {
        id: 't11', name: 'System Usability Scale (SUS) Template', category: 'prototype',
        description: 'Measure perceived usability using the industry-standard SUS methodology.',
        blocks: ['Welcome', 'Task', 'Opinion Scale', 'Opinion Scale', 'Opinion Scale', 'Opinion Scale', 'Opinion Scale', 'Opinion Scale', 'Opinion Scale', 'Opinion Scale', 'Thank You'],
        gain: ['Understand usability perception', 'Benchmark over time', 'Identify friction']
    }
];

export const blockTypes = [
    { id: 'welcome', name: 'Welcome', icon: '👋', color: '#6366f1', description: 'Study introduction and language selection' },
    { id: 'task', name: 'Task', icon: '🎯', color: '#3b82f6', description: 'Usability task with prototype or live website' },
    { id: 'open-question', name: 'Open Question', icon: '💬', color: '#8b5cf6', description: 'Collect qualitative open-ended responses' },
    { id: 'simple-input', name: 'Simple Input', icon: '✏️', color: '#06b6d4', description: 'Collect short text, number, email, or date' },
    { id: 'opinion-scale', name: 'Opinion Scale', icon: '⭐', color: '#f59e0b', description: 'Rating scale (numerical, stars, or emotions)' },
    { id: 'multiple-choice', name: 'Multiple Choice', icon: '☑️', color: '#10b981', description: 'Single or multi-select answer choices' },
    { id: 'yes-no', name: 'Yes / No', icon: '✅', color: '#ef4444', description: 'Binary decision question' },
    { id: 'context-screen', name: 'Context Screen', icon: '📄', color: '#64748b', description: 'Non-interactive informational screen' },
    { id: 'thank-you', name: 'Thank You', icon: '🎉', color: '#10b981', description: 'Completion and farewell message' },
];

export const projects = [
    {
        id: 'p1', name: 'Fashion App Redesign', status: 'active', studyCount: 3,
        updated: '2026-03-02', created: '2026-02-15',
        studies: [
            { id: 's1', name: 'Checkout Flow Usability Test', status: 'completed', participants: 15, updated: '2026-03-01', integration: 'Figma' },
            { id: 's2', name: 'Navigation Discovery Test', status: 'live', participants: 8, updated: '2026-03-02', integration: 'Figma' },
            { id: 's3', name: 'Product Pages Feedback', status: 'draft', participants: 0, updated: '2026-02-28', integration: 'Figma' },
        ]
    },
    {
        id: 'p2', name: 'SaaS Dashboard MVP', status: 'active', studyCount: 2,
        updated: '2026-02-28', created: '2026-02-10',
        studies: [
            { id: 's4', name: 'Dashboard Usability Test', status: 'completed', participants: 12, updated: '2026-02-27', integration: 'Figma' },
            { id: 's5', name: 'Onboarding Flow Test', status: 'draft', participants: 0, updated: '2026-02-28', integration: 'Live Website' },
        ]
    },
    {
        id: 'p3', name: 'Healthcare Portal', status: 'active', studyCount: 1,
        updated: '2026-02-20', created: '2026-02-05',
        studies: [
            { id: 's6', name: 'Patient Booking Flow', status: 'paused', participants: 5, updated: '2026-02-20', integration: 'Figma' },
        ]
    },
    {
        id: 'p4', name: 'E-commerce Rebrand', status: 'archived', studyCount: 2,
        updated: '2026-01-15', created: '2025-12-01',
        studies: [
            { id: 's7', name: 'Homepage A/B Test', status: 'completed', participants: 20, updated: '2026-01-10', integration: 'Live Website' },
            { id: 's8', name: 'Cart Experience Study', status: 'completed', participants: 15, updated: '2026-01-15', integration: 'Live Website' },
        ]
    }
];

export const sampleStudyBlocks = [
    { id: 'b1', type: 'welcome', title: 'Welcome', content: { title: 'Welcome to Our Study', description: 'Thank you for participating in this usability test. Your feedback will help us improve the shopping experience.', language: 'English' } },
    { id: 'b2', type: 'task', title: 'Task 1: Browse Products', content: { taskTitle: 'Browse and find a product', description: 'Navigate to the product catalog and find a pair of running shoes under $100.', product: 'Figma Prototype', startScreen: 'Home Page', successCriteria: 'Reach product detail page' } },
    { id: 'b3', type: 'opinion-scale', title: 'Ease of Task', content: { question: 'How easy was it to find the product you were looking for?', scaleType: 'numerical', range: [1, 7], labels: ['Very Difficult', 'Very Easy'] } },
    { id: 'b4', type: 'task', title: 'Task 2: Add to Cart', content: { taskTitle: 'Add item to cart and proceed to checkout', description: 'Add the running shoes to your cart and proceed to the checkout page.', product: 'Figma Prototype', startScreen: 'Product Detail', successCriteria: 'Reach checkout page' } },
    { id: 'b5', type: 'opinion-scale', title: 'Checkout Experience', content: { question: 'How would you rate the checkout experience?', scaleType: 'stars', range: [1, 5], labels: ['Poor', 'Excellent'] } },
    { id: 'b6', type: 'multiple-choice', title: 'Navigation Method', content: { question: 'How did you navigate to the product?', choices: ['Search bar', 'Category menu', 'Homepage banner', 'Browsing'], selectionType: 'single' } },
    { id: 'b7', type: 'open-question', title: 'Feedback', content: { question: 'What was the most confusing part of the shopping experience?', notes: 'Please be as specific as possible.' } },
    { id: 'b8', type: 'yes-no', title: 'Would Recommend', content: { question: 'Would you recommend this shopping experience to a friend?', visualType: 'icons' } },
    { id: 'b9', type: 'open-question', title: 'Improvements', content: { question: 'What could we do to improve the overall experience?', notes: '' } },
    { id: 'b10', type: 'thank-you', title: 'Thank You', content: { title: 'Thank you for your time!', description: 'Your feedback is incredibly valuable and will help us create a better product.' } },
];

export const resultsData = {
    healthScore: 82,
    successRate: 73,
    avgTime: '8m 42s',
    misclickRate: 12,
    totalParticipants: 15,
    completed: 12,
    inProgress: 2,
    droppedOff: 1,
    participants: [
        { id: 1, name: 'Participant #1', status: 'completed', healthScore: 95, device: 'Desktop', duration: '7m 12s', success: true },
        { id: 2, name: 'Participant #2', status: 'completed', healthScore: 88, device: 'Mobile', duration: '9m 45s', success: true },
        { id: 3, name: 'Participant #3', status: 'completed', healthScore: 72, device: 'Desktop', duration: '11m 03s', success: false },
        { id: 4, name: 'Participant #4', status: 'completed', healthScore: 91, device: 'Mobile', duration: '6m 55s', success: true },
        { id: 5, name: 'Participant #5', status: 'completed', healthScore: 45, device: 'Desktop', duration: '3m 20s', success: true, flagged: 'Speeder' },
        { id: 6, name: 'Participant #6', status: 'completed', healthScore: 85, device: 'Tablet', duration: '8m 30s', success: true },
        { id: 7, name: 'Participant #7', status: 'completed', healthScore: 78, device: 'Desktop', duration: '10m 15s', success: false },
        { id: 8, name: 'Participant #8', status: 'completed', healthScore: 93, device: 'Mobile', duration: '7m 48s', success: true },
        { id: 9, name: 'Participant #9', status: 'completed', healthScore: 82, device: 'Desktop', duration: '9m 02s', success: true },
        { id: 10, name: 'Participant #10', status: 'completed', healthScore: 70, device: 'Mobile', duration: '12m 30s', success: false },
        { id: 11, name: 'Participant #11', status: 'completed', healthScore: 89, device: 'Desktop', duration: '7m 55s', success: true },
        { id: 12, name: 'Participant #12', status: 'completed', healthScore: 86, device: 'Desktop', duration: '8m 12s', success: true },
        { id: 13, name: 'Participant #13', status: 'in-progress', healthScore: null, device: 'Mobile', duration: '-', success: null },
        { id: 14, name: 'Participant #14', status: 'in-progress', healthScore: null, device: 'Desktop', duration: '-', success: null },
        { id: 15, name: 'Participant #15', status: 'dropped', healthScore: 30, device: 'Mobile', duration: '2m 10s', success: false, flagged: 'Drop-off at Block 3' },
    ],
    insightCards: [
        { type: 'alert', title: '8 of 12 users struggled with Task 2', description: 'Most users clicked on the Logo instead of the Menu icon to find checkout. Consider making the cart icon more prominent.', severity: 'critical' },
        { type: 'anomaly', title: 'Mobile users 50% faster than Desktop', description: 'Mobile users completed tasks significantly faster. The mobile layout may be hiding unnecessary steps or providing a simpler path.', severity: 'warning' },
        { type: 'pattern', title: 'Search Bar preferred over Menu', description: '80% of users used the Search Bar to find products instead of browsing categories. Consider promoting search-first navigation.', severity: 'info' },
        { type: 'saturation', title: 'Insight saturation at 95%', description: 'New participants are repeating known patterns. You have enough data for confident conclusions. Consider stopping the test.', severity: 'success' },
    ],
    blockResults: [
        { blockId: 'b2', name: 'Task 1: Browse Products', successRate: 83, avgTime: '2m 15s', frictionScore: 35, misclickRate: 8 },
        { blockId: 'b4', name: 'Task 2: Add to Cart', successRate: 58, avgTime: '3m 40s', frictionScore: 78, misclickRate: 22 },
        { blockId: 'b3', name: 'Ease of Task', avgScore: 5.2, responses: 12 },
        { blockId: 'b5', name: 'Checkout Experience', avgScore: 3.8, responses: 12 },
        { blockId: 'b6', name: 'Navigation Method', topChoice: 'Search bar', distribution: { 'Search bar': 65, 'Category menu': 20, 'Homepage banner': 10, 'Browsing': 5 } },
    ],
    completionFunnel: [
        { block: 'Welcome', count: 15 },
        { block: 'Task 1', count: 15 },
        { block: 'Rating 1', count: 14 },
        { block: 'Task 2', count: 14 },
        { block: 'Rating 2', count: 13 },
        { block: 'Navigation Q', count: 12 },
        { block: 'Feedback', count: 12 },
        { block: 'Yes/No', count: 12 },
        { block: 'Improvements', count: 12 },
        { block: 'Thank You', count: 12 },
    ]
};

export const reportData = {
    verdict: 'Needs Revision',
    verdictReady: false,
    kpiImpact: 'The current checkout flow may lead to a 20% higher cart abandonment rate due to navigation confusion in Task 2.',
    pSusScore: 68,
    cognitiveLoad: 'High',
    goalRecap: 'Test the shopping experience of fashion mobile app prototype, focusing on navigation, product discovery, and checkout.',
    issues: [
        {
            id: 1, severity: 'critical', title: 'Checkout button is not visible enough',
            impact: '75% of users couldn\'t find the checkout button on first attempt',
            evidence: 'Confusion heatmap shows 40 rage clicks near the header area where users expected the cart icon.',
            recommendation: 'Move the cart/checkout button to a fixed position in the header with a badge counter. Increase icon size by 20%.'
        },
        {
            id: 2, severity: 'critical', title: 'Product search results are misleading',
            impact: '60% of users selected wrong products from search results',
            evidence: 'Search result cards don\'t show price or size availability, leading to repeated back-navigation.',
            recommendation: 'Add price, rating, and availability badge to search result cards. Show thumbnail images.'
        },
        {
            id: 3, severity: 'major', title: 'Category menu is being ignored',
            impact: '80% of users prefer search over category browsing',
            evidence: 'Click map shows category menu received only 12% of total navigation clicks.',
            recommendation: 'Redesign category menu with visual icons and trending labels. Consider a mega-menu format.'
        },
        {
            id: 4, severity: 'minor', title: 'Thank you page lacks next steps',
            impact: 'Users felt uncertain about order confirmation',
            evidence: '45% of participants mentioned wanting email confirmation visibility.',
            recommendation: 'Add order summary, estimated delivery date, and email confirmation notice to the thank you page.'
        }
    ]
};

export const creditsData = {
    planName: 'Pro',
    planPrice: '$49/mo',
    renewalDate: '2026-04-01',
    aiGenCredits: { used: 340, total: 500 },
    aiVoiceCredits: { used: 120, total: 200 },
    plans: [
        { name: 'Free', price: '$0/mo', aiGen: 50, aiVoice: 10, features: ['1 Project', '3 Studies', 'Basic Templates', 'Community Support'] },
        { name: 'Pro', price: '$49/mo', aiGen: 500, aiVoice: 200, features: ['Unlimited Projects', 'Unlimited Studies', 'All Templates', 'Priority Support', 'Export Reports'], current: true },
        { name: 'Enterprise', price: 'Custom', aiGen: 'Unlimited', aiVoice: 'Unlimited', features: ['Everything in Pro', 'SSO & SAML', 'Custom Integrations', 'Dedicated Support', 'SLA'] },
    ]
};

export const helpCategories = [
    { id: 'getting-started', name: 'Getting Started', icon: '🚀', articleCount: 8 },
    { id: 'study-creation', name: 'Study Creation', icon: '📝', articleCount: 12 },
    { id: 'ai-features', name: 'AI Features', icon: '🤖', articleCount: 6 },
    { id: 'results-analysis', name: 'Results & Analysis', icon: '📊', articleCount: 9 },
    { id: 'billing-credits', name: 'Billing & Credits', icon: '💳', articleCount: 5 },
    { id: 'account', name: 'Account', icon: '👤', articleCount: 7 },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: '🔧', articleCount: 4 },
];

export const helpArticles = [
    { id: 'a1', category: 'getting-started', title: 'What is Userlenz?', updated: '2026-02-15' },
    { id: 'a2', category: 'getting-started', title: 'Creating your first study', updated: '2026-02-20' },
    { id: 'a3', category: 'getting-started', title: 'Understanding the Canvas', updated: '2026-02-18' },
    { id: 'a4', category: 'study-creation', title: 'Using AI to generate studies', updated: '2026-02-25' },
    { id: 'a5', category: 'study-creation', title: 'Available block types', updated: '2026-02-22' },
    { id: 'a6', category: 'ai-features', title: 'How AI credits work', updated: '2026-02-28' },
    { id: 'a7', category: 'results-analysis', title: 'Understanding your results', updated: '2026-03-01' },
    { id: 'a8', category: 'billing-credits', title: 'Managing your subscription', updated: '2026-02-10' },
];

// ============================================
// Study Goals (AI-Generated per Study)
// ============================================

export const studyGoals = [
    {
        id: 'g1',
        title: 'Evaluate Checkout Flow Usability',
        description: 'Test whether users can successfully complete a purchase through the checkout flow, identify friction points in cart management and payment steps.',
        icon: '🛒',
        status: 'completed',
        blockCount: 10,
        estimatedTime: '8-12 min',
        blocks: [
            { id: 'g1-b1', type: 'welcome', title: 'Welcome', content: { title: 'Welcome to Our Study', description: 'Thank you for participating in this usability test. Your feedback will help us improve the shopping experience.', language: 'English' } },
            { id: 'g1-b2', type: 'task', title: 'Task 1: Browse Products', content: { taskTitle: 'Browse and find a product', description: 'Navigate to the product catalog and find a pair of running shoes under $100.', product: 'Figma Prototype', startScreen: 'Home Page', successCriteria: 'Reach product detail page' } },
            { id: 'g1-b3', type: 'opinion-scale', title: 'Ease of Browsing', content: { question: 'How easy was it to find the product you were looking for?', scaleType: 'numerical', range: [1, 7], labels: ['Very Difficult', 'Very Easy'] } },
            { id: 'g1-b4', type: 'task', title: 'Task 2: Add to Cart & Checkout', content: { taskTitle: 'Add item to cart and proceed to checkout', description: 'Add the running shoes to your cart and proceed to the checkout page.', product: 'Figma Prototype', startScreen: 'Product Detail', successCriteria: 'Reach checkout page' } },
            { id: 'g1-b5', type: 'opinion-scale', title: 'Checkout Experience', content: { question: 'How would you rate the checkout experience?', scaleType: 'stars', range: [1, 5], labels: ['Poor', 'Excellent'] } },
            { id: 'g1-b6', type: 'multiple-choice', title: 'Navigation Method', content: { question: 'How did you navigate to the product?', choices: ['Search bar', 'Category menu', 'Homepage banner', 'Browsing'], selectionType: 'single' } },
            { id: 'g1-b7', type: 'open-question', title: 'Checkout Feedback', content: { question: 'What was the most confusing part of the checkout experience?', notes: 'Please be as specific as possible.' } },
            { id: 'g1-b8', type: 'yes-no', title: 'Would Purchase Again', content: { question: 'Would you feel confident purchasing from this store?', visualType: 'icons' } },
            { id: 'g1-b9', type: 'open-question', title: 'Improvements', content: { question: 'What could we do to improve the checkout experience?', notes: '' } },
            { id: 'g1-b10', type: 'thank-you', title: 'Thank You', content: { title: 'Thank you for your time!', description: 'Your feedback is incredibly valuable and will help us create a better product.' } },
        ],
        resultsData: {
            healthScore: 82, successRate: 73, avgTime: '8m 42s', misclickRate: 12,
            totalParticipants: 15, completed: 12, inProgress: 2, droppedOff: 1,
            participants: [
                { id: 1, name: 'Participant #1', status: 'completed', healthScore: 95, device: 'Desktop', duration: '7m 12s', success: true },
                { id: 2, name: 'Participant #2', status: 'completed', healthScore: 88, device: 'Mobile', duration: '9m 45s', success: true },
                { id: 3, name: 'Participant #3', status: 'completed', healthScore: 72, device: 'Desktop', duration: '11m 03s', success: false },
                { id: 4, name: 'Participant #4', status: 'completed', healthScore: 91, device: 'Mobile', duration: '6m 55s', success: true },
                { id: 5, name: 'Participant #5', status: 'completed', healthScore: 45, device: 'Desktop', duration: '3m 20s', success: true, flagged: 'Speeder' },
                { id: 6, name: 'Participant #6', status: 'completed', healthScore: 85, device: 'Tablet', duration: '8m 30s', success: true },
                { id: 7, name: 'Participant #7', status: 'completed', healthScore: 78, device: 'Desktop', duration: '10m 15s', success: false },
                { id: 8, name: 'Participant #8', status: 'completed', healthScore: 93, device: 'Mobile', duration: '7m 48s', success: true },
                { id: 9, name: 'Participant #9', status: 'completed', healthScore: 82, device: 'Desktop', duration: '9m 02s', success: true },
                { id: 10, name: 'Participant #10', status: 'completed', healthScore: 70, device: 'Mobile', duration: '12m 30s', success: false },
                { id: 11, name: 'Participant #11', status: 'completed', healthScore: 89, device: 'Desktop', duration: '7m 55s', success: true },
                { id: 12, name: 'Participant #12', status: 'completed', healthScore: 86, device: 'Desktop', duration: '8m 12s', success: true },
                { id: 13, name: 'Participant #13', status: 'in-progress', healthScore: null, device: 'Mobile', duration: '-', success: null },
                { id: 14, name: 'Participant #14', status: 'in-progress', healthScore: null, device: 'Desktop', duration: '-', success: null },
                { id: 15, name: 'Participant #15', status: 'dropped', healthScore: 30, device: 'Mobile', duration: '2m 10s', success: false, flagged: 'Drop-off at Block 3' },
            ],
            insightCards: [
                { type: 'alert', title: '8 of 12 users struggled with Task 2', description: 'Most users clicked on the Logo instead of the Menu icon to find checkout. Consider making the cart icon more prominent.', severity: 'critical' },
                { type: 'anomaly', title: 'Mobile users 50% faster than Desktop', description: 'Mobile users completed tasks significantly faster.', severity: 'warning' },
                { type: 'pattern', title: 'Search Bar preferred over Menu', description: '80% of users used the Search Bar to find products.', severity: 'info' },
                { type: 'saturation', title: 'Insight saturation at 95%', description: 'New participants are repeating known patterns. Consider stopping the test.', severity: 'success' },
            ],
            blockResults: [
                { blockId: 'g1-b2', name: 'Task 1: Browse Products', successRate: 83, avgTime: '2m 15s', frictionScore: 35, misclickRate: 8 },
                { blockId: 'g1-b4', name: 'Task 2: Add to Cart & Checkout', successRate: 58, avgTime: '3m 40s', frictionScore: 78, misclickRate: 22 },
                { blockId: 'g1-b3', name: 'Ease of Browsing', avgScore: 5.2, responses: 12 },
                { blockId: 'g1-b5', name: 'Checkout Experience', avgScore: 3.8, responses: 12 },
                { blockId: 'g1-b6', name: 'Navigation Method', topChoice: 'Search bar', distribution: { 'Search bar': 65, 'Category menu': 20, 'Homepage banner': 10, 'Browsing': 5 } },
            ],
            completionFunnel: [
                { block: 'Welcome', count: 15 }, { block: 'Task 1', count: 15 }, { block: 'Rating 1', count: 14 },
                { block: 'Task 2', count: 14 }, { block: 'Rating 2', count: 13 }, { block: 'Navigation Q', count: 12 },
                { block: 'Feedback', count: 12 }, { block: 'Yes/No', count: 12 }, { block: 'Improvements', count: 12 }, { block: 'Thank You', count: 12 },
            ]
        },
        reportData: {
            verdict: 'Needs Revision', verdictReady: false,
            kpiImpact: 'The current checkout flow may lead to a 20% higher cart abandonment rate due to navigation confusion in Task 2.',
            pSusScore: 68, cognitiveLoad: 'High', taskSuccess: 73,
            goalRecap: 'Evaluate whether users can successfully complete a purchase through the checkout flow.',
            issues: [
                { id: 1, severity: 'critical', title: 'Checkout button is not visible enough', impact: '75% of users couldn\'t find the checkout button', evidence: 'Confusion heatmap shows 40 rage clicks near the header area.', recommendation: 'Move the cart/checkout button to a fixed position in the header.' },
                { id: 2, severity: 'critical', title: 'Product search results are misleading', impact: '60% of users selected wrong products', evidence: 'Search result cards don\'t show price or size availability.', recommendation: 'Add price, rating, and availability badge to search result cards.' },
                { id: 3, severity: 'major', title: 'Category menu is being ignored', impact: '80% prefer search over category browsing', evidence: 'Click map shows category menu received only 12% of clicks.', recommendation: 'Redesign category menu with visual icons and trending labels.' },
                { id: 4, severity: 'minor', title: 'Thank you page lacks next steps', impact: 'Users felt uncertain about order confirmation', evidence: '45% of participants mentioned wanting email confirmation.', recommendation: 'Add order summary and estimated delivery date.' },
            ]
        }
    },
    {
        id: 'g2',
        title: 'Assess Product Discovery & Search',
        description: 'Understand how users find and browse products, evaluate search functionality effectiveness, and identify navigation patterns.',
        icon: '🔍',
        status: 'completed',
        blockCount: 8,
        estimatedTime: '6-8 min',
        blocks: [
            { id: 'g2-b1', type: 'welcome', title: 'Welcome', content: { title: 'Product Discovery Study', description: 'Help us understand how you find products in our fashion app. Your insights will shape the browsing experience.', language: 'English' } },
            { id: 'g2-b2', type: 'task', title: 'Task 1: Find a Specific Product', content: { taskTitle: 'Find a specific product using search', description: 'Use the search functionality to find a "black leather jacket" in size M.', product: 'Figma Prototype', startScreen: 'Home Page', successCriteria: 'Reach product detail page of leather jacket' } },
            { id: 'g2-b3', type: 'opinion-scale', title: 'Search Effectiveness', content: { question: 'How effective was the search in helping you find what you needed?', scaleType: 'numerical', range: [1, 7], labels: ['Not Effective', 'Very Effective'] } },
            { id: 'g2-b4', type: 'task', title: 'Task 2: Browse by Category', content: { taskTitle: 'Find shoes using category navigation', description: 'Without using search, navigate through categories to find athletic shoes.', product: 'Figma Prototype', startScreen: 'Home Page', successCriteria: 'Reach athletic shoes listing' } },
            { id: 'g2-b5', type: 'multiple-choice', title: 'Preferred Discovery Method', content: { question: 'Which method do you prefer for finding products?', choices: ['Search bar', 'Categories/filters', 'Recommendations', 'Browsing all products'], selectionType: 'single' } },
            { id: 'g2-b6', type: 'opinion-scale', title: 'Filter Usability', content: { question: 'How easy was it to use product filters?', scaleType: 'stars', range: [1, 5], labels: ['Very Hard', 'Very Easy'] } },
            { id: 'g2-b7', type: 'open-question', title: 'Discovery Pain Points', content: { question: 'What frustrated you most when trying to find products?', notes: 'Think about filters, search results, and category navigation.' } },
            { id: 'g2-b8', type: 'thank-you', title: 'Thank You', content: { title: 'Thank you!', description: 'Your feedback will help us improve how you discover products.' } },
        ],
        resultsData: {
            healthScore: 88, successRate: 81, avgTime: '6m 15s', misclickRate: 8,
            totalParticipants: 15, completed: 13, inProgress: 1, droppedOff: 1,
            participants: [
                { id: 1, name: 'Participant #1', status: 'completed', healthScore: 92, device: 'Desktop', duration: '5m 42s', success: true },
                { id: 2, name: 'Participant #2', status: 'completed', healthScore: 85, device: 'Mobile', duration: '7m 20s', success: true },
                { id: 3, name: 'Participant #3', status: 'completed', healthScore: 90, device: 'Desktop', duration: '5m 55s', success: true },
                { id: 4, name: 'Participant #4', status: 'completed', healthScore: 68, device: 'Mobile', duration: '8m 10s', success: false },
                { id: 5, name: 'Participant #5', status: 'completed', healthScore: 94, device: 'Desktop', duration: '4m 30s', success: true },
                { id: 6, name: 'Participant #6', status: 'completed', healthScore: 87, device: 'Tablet', duration: '6m 45s', success: true },
                { id: 7, name: 'Participant #7', status: 'completed', healthScore: 76, device: 'Desktop', duration: '7m 50s', success: true },
                { id: 8, name: 'Participant #8', status: 'completed', healthScore: 91, device: 'Mobile', duration: '5m 15s', success: true },
                { id: 9, name: 'Participant #9', status: 'completed', healthScore: 83, device: 'Desktop', duration: '6m 30s', success: true },
                { id: 10, name: 'Participant #10', status: 'completed', healthScore: 89, device: 'Mobile', duration: '6m 08s', success: true },
                { id: 11, name: 'Participant #11', status: 'completed', healthScore: 72, device: 'Desktop', duration: '8m 45s', success: false },
                { id: 12, name: 'Participant #12', status: 'completed', healthScore: 95, device: 'Desktop', duration: '4m 55s', success: true },
                { id: 13, name: 'Participant #13', status: 'completed', healthScore: 88, device: 'Mobile', duration: '6m 20s', success: true },
                { id: 14, name: 'Participant #14', status: 'in-progress', healthScore: null, device: 'Desktop', duration: '-', success: null },
                { id: 15, name: 'Participant #15', status: 'dropped', healthScore: 35, device: 'Mobile', duration: '1m 45s', success: false, flagged: 'Drop-off at Block 2' },
            ],
            insightCards: [
                { type: 'pattern', title: 'Search is 3x faster than browsing', description: 'Users who used search found products in 2m vs 6m for category browsing.', severity: 'info' },
                { type: 'alert', title: 'Category filters confuse 40% of users', description: 'Multi-select filters caused confusion — users didn\'t realize they could combine filters.', severity: 'critical' },
                { type: 'anomaly', title: 'Auto-complete drives 70% of searches', description: 'Most users rely heavily on search suggestions rather than typing full queries.', severity: 'warning' },
                { type: 'saturation', title: 'Data saturation reached', description: 'Consistent patterns observed. Enough data for confident conclusions.', severity: 'success' },
            ],
            blockResults: [
                { blockId: 'g2-b2', name: 'Task 1: Find via Search', successRate: 92, avgTime: '1m 50s', frictionScore: 18, misclickRate: 5 },
                { blockId: 'g2-b4', name: 'Task 2: Browse by Category', successRate: 65, avgTime: '3m 25s', frictionScore: 62, misclickRate: 15 },
                { blockId: 'g2-b3', name: 'Search Effectiveness', avgScore: 5.8, responses: 13 },
                { blockId: 'g2-b6', name: 'Filter Usability', avgScore: 3.2, responses: 13 },
                { blockId: 'g2-b5', name: 'Preferred Discovery', topChoice: 'Search bar', distribution: { 'Search bar': 55, 'Categories/filters': 25, 'Recommendations': 15, 'Browsing all': 5 } },
            ],
            completionFunnel: [
                { block: 'Welcome', count: 15 }, { block: 'Search Task', count: 15 }, { block: 'Rating', count: 14 },
                { block: 'Category Task', count: 14 }, { block: 'Preferences', count: 13 }, { block: 'Filter Rating', count: 13 },
                { block: 'Feedback', count: 13 }, { block: 'Thank You', count: 13 },
            ]
        },
        reportData: {
            verdict: 'Acceptable', verdictReady: true,
            kpiImpact: 'Search functionality performs well but category navigation needs significant improvement to reduce drop-off.',
            pSusScore: 74, cognitiveLoad: 'Medium', taskSuccess: 81,
            goalRecap: 'Understand how users find and browse products, evaluate search effectiveness.',
            issues: [
                { id: 1, severity: 'critical', title: 'Category filter UX is confusing', impact: '40% of users couldn\'t use multi-select filters correctly', evidence: 'Users expected single-select behavior and missed active filters.', recommendation: 'Add clear filter chips and a visible "Clear all" button.' },
                { id: 2, severity: 'major', title: 'No search result feedback', impact: 'Users weren\'t sure if search was working', evidence: '30% of users typed query and waited without scrolling.', recommendation: 'Add result count, loading indicator, and empty state messaging.' },
                { id: 3, severity: 'minor', title: 'Category icons are too small', impact: 'Reduced tappability on mobile devices', evidence: 'Mobile users misclicked category icons 3x more than desktop.', recommendation: 'Increase touch target size to 48px minimum.' },
            ]
        }
    },
    {
        id: 'g3',
        title: 'Measure Overall Brand & Trust Perception',
        description: 'Gauge user confidence in the brand, assess visual design trustworthiness, and understand emotional responses to the shopping experience.',
        icon: '💎',
        status: 'completed',
        blockCount: 7,
        estimatedTime: '5-7 min',
        blocks: [
            { id: 'g3-b1', type: 'welcome', title: 'Welcome', content: { title: 'Brand Perception Study', description: 'We\'d love to understand your first impressions and overall feelings about our fashion store.', language: 'English' } },
            { id: 'g3-b2', type: 'task', title: 'Task: Explore the Store', content: { taskTitle: 'Freely explore the store for 2 minutes', description: 'Browse through the store naturally — look at products, pages, and any area that interests you.', product: 'Figma Prototype', startScreen: 'Home Page', successCriteria: 'Spend at least 2 minutes exploring' } },
            { id: 'g3-b3', type: 'opinion-scale', title: 'Trust Level', content: { question: 'How much do you trust this online store?', scaleType: 'numerical', range: [1, 7], labels: ['Not at All', 'Completely'] } },
            { id: 'g3-b4', type: 'opinion-scale', title: 'Visual Appeal', content: { question: 'How visually appealing is the store design?', scaleType: 'stars', range: [1, 5], labels: ['Unappealing', 'Beautiful'] } },
            { id: 'g3-b5', type: 'multiple-choice', title: 'Brand Impression', content: { question: 'Which words best describe this store?', choices: ['Modern', 'Trustworthy', 'Confusing', 'Premium', 'Cheap', 'Professional'], selectionType: 'multiple' } },
            { id: 'g3-b6', type: 'open-question', title: 'First Impression', content: { question: 'What was your very first impression when you saw the store?', notes: 'Describe the feeling or thought in one sentence.' } },
            { id: 'g3-b7', type: 'thank-you', title: 'Thank You', content: { title: 'Thank you!', description: 'Your perception insights will help us build a more trustworthy shopping experience.' } },
        ],
        resultsData: {
            healthScore: 91, successRate: 95, avgTime: '5m 30s', misclickRate: 4,
            totalParticipants: 15, completed: 14, inProgress: 0, droppedOff: 1,
            participants: [
                { id: 1, name: 'Participant #1', status: 'completed', healthScore: 96, device: 'Desktop', duration: '5m 10s', success: true },
                { id: 2, name: 'Participant #2', status: 'completed', healthScore: 93, device: 'Mobile', duration: '4m 45s', success: true },
                { id: 3, name: 'Participant #3', status: 'completed', healthScore: 88, device: 'Desktop', duration: '6m 20s', success: true },
                { id: 4, name: 'Participant #4', status: 'completed', healthScore: 95, device: 'Mobile', duration: '5m 00s', success: true },
                { id: 5, name: 'Participant #5', status: 'completed', healthScore: 90, device: 'Desktop', duration: '5m 35s', success: true },
                { id: 6, name: 'Participant #6', status: 'completed', healthScore: 87, device: 'Tablet', duration: '6m 10s', success: true },
                { id: 7, name: 'Participant #7', status: 'completed', healthScore: 92, device: 'Desktop', duration: '4m 50s', success: true },
                { id: 8, name: 'Participant #8', status: 'completed', healthScore: 94, device: 'Mobile', duration: '5m 22s', success: true },
                { id: 9, name: 'Participant #9', status: 'completed', healthScore: 85, device: 'Desktop', duration: '6m 40s', success: true },
                { id: 10, name: 'Participant #10', status: 'completed', healthScore: 91, device: 'Mobile', duration: '5m 15s', success: true },
                { id: 11, name: 'Participant #11', status: 'completed', healthScore: 89, device: 'Desktop', duration: '5m 48s', success: true },
                { id: 12, name: 'Participant #12', status: 'completed', healthScore: 93, device: 'Desktop', duration: '4m 55s', success: true },
                { id: 13, name: 'Participant #13', status: 'completed', healthScore: 86, device: 'Mobile', duration: '6m 05s', success: true },
                { id: 14, name: 'Participant #14', status: 'completed', healthScore: 70, device: 'Desktop', duration: '7m 30s', success: false },
                { id: 15, name: 'Participant #15', status: 'dropped', healthScore: 25, device: 'Mobile', duration: '1m 10s', success: false, flagged: 'Drop-off at Block 1' },
            ],
            insightCards: [
                { type: 'pattern', title: 'Strong trust signals from visual design', description: '85% of users rated trust at 5+ out of 7, citing clean layout and professional imagery.', severity: 'success' },
                { type: 'anomaly', title: '"Premium" perception drops on mobile', description: 'Desktop users perceive the brand as more premium compared to mobile users.', severity: 'warning' },
                { type: 'pattern', title: 'First impressions are positive', description: '90% of users described positive first impressions focusing on modern aesthetics.', severity: 'info' },
                { type: 'saturation', title: 'Full data saturation', description: 'All 14 completed sessions show consistent patterns. High confidence.', severity: 'success' },
            ],
            blockResults: [
                { blockId: 'g3-b2', name: 'Task: Explore Store', successRate: 95, avgTime: '2m 30s', frictionScore: 12, misclickRate: 4 },
                { blockId: 'g3-b3', name: 'Trust Level', avgScore: 5.6, responses: 14 },
                { blockId: 'g3-b4', name: 'Visual Appeal', avgScore: 4.2, responses: 14 },
                { blockId: 'g3-b5', name: 'Brand Impression', topChoice: 'Modern', distribution: { 'Modern': 78, 'Trustworthy': 64, 'Premium': 50, 'Professional': 43, 'Confusing': 14, 'Cheap': 7 } },
            ],
            completionFunnel: [
                { block: 'Welcome', count: 15 }, { block: 'Explore', count: 14 }, { block: 'Trust', count: 14 },
                { block: 'Visual', count: 14 }, { block: 'Brand Words', count: 14 }, { block: 'Impression', count: 14 }, { block: 'Thank You', count: 14 },
            ]
        },
        reportData: {
            verdict: 'Good', verdictReady: true,
            kpiImpact: 'Brand perception is strong overall. Mobile experience needs polishing to match desktop-level trust signals.',
            pSusScore: 79, cognitiveLoad: 'Low', taskSuccess: 95,
            goalRecap: 'Gauge user confidence in the brand and assess visual design trustworthiness.',
            issues: [
                { id: 1, severity: 'major', title: 'Mobile brand perception gap', impact: 'Mobile users rate trust 1.2 points lower than desktop users', evidence: 'Smaller product images and cramped layout reduce perceived quality.', recommendation: 'Optimize mobile product cards with larger images and more whitespace.' },
                { id: 2, severity: 'minor', title: 'Missing social proof elements', impact: 'Users looked for reviews but didn\'t find them prominently', evidence: '35% of users mentioned wanting to see reviews/ratings.', recommendation: 'Add star ratings and review count to product cards.' },
            ]
        }
    }
];
