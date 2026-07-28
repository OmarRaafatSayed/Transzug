#!/usr/bin/env node

/**
 * Smoke Test Script
 * Verifies core dashboard functionality
 */

console.log('🧪 Running Dashboard Smoke Tests...\n');

const tests = {
  passed: 0,
  failed: 0,
};

function pass(name) {
  console.log(`✅ ${name}`);
  tests.passed++;
}

function fail(name, error) {
  console.log(`❌ ${name}`);
  console.log(`   Error: ${error}\n`);
  tests.failed++;
}

// Test 1: Context Provider exists
try {
  const fs = await import('fs');
  const contextPath = './src/lib/context/dashboard-context.tsx';
  if (fs.existsSync(contextPath)) {
    pass('Dashboard Context exists');
  } else {
    fail('Dashboard Context exists', 'File not found');
  }
} catch (e) {
  fail('Dashboard Context exists', e.message);
}

// Test 2: Hero Tab exists
try {
  const fs = await import('fs');
  const heroTabPath = './src/components/dashboard/hero-tab.tsx';
  if (fs.existsSync(heroTabPath)) {
    pass('Hero Tab component exists');
  } else {
    fail('Hero Tab component exists', 'File not found');
  }
} catch (e) {
  fail('Hero Tab component exists', e.message);
}

// Test 3: API types exist
try {
  const fs = await import('fs');
  const typesPath = './src/lib/api/types.ts';
  if (fs.existsSync(typesPath)) {
    pass('API types defined');
  } else {
    fail('API types defined', 'File not found');
  }
} catch (e) {
  fail('API types defined', e.message);
}

// Test 4: Dashboard API exists
try {
  const fs = await import('fs');
  const apiPath = './src/lib/api/dashboard-api.ts';
  if (fs.existsSync(apiPath)) {
    pass('Dashboard API exists');
  } else {
    fail('Dashboard API exists', 'File not found');
  }
} catch (e) {
  fail('Dashboard API exists', e.message);
}

// Test 5: LocalStorage integration
try {
  const fs = await import('fs');
  const contextContent = fs.readFileSync('./src/lib/context/dashboard-context.tsx', 'utf-8');
  if (contextContent.includes('localStorage')) {
    pass('LocalStorage integration present');
  } else {
    fail('LocalStorage integration present', 'localStorage not found in context');
  }
} catch (e) {
  fail('LocalStorage integration present', e.message);
}

// Test 6: Hero Section uses context
try {
  const fs = await import('fs');
  const heroContent = fs.readFileSync('./src/components/hero-section.tsx', 'utf-8');
  if (heroContent.includes('useDashboard')) {
    pass('Hero Section connected to context');
  } else {
    fail('Hero Section connected to context', 'useDashboard hook not found');
  }
} catch (e) {
  fail('Hero Section connected to context', e.message);
}

// Test 7: Layout wraps with Provider
try {
  const fs = await import('fs');
  const layoutContent = fs.readFileSync('./src/app/[locale]/layout.tsx', 'utf-8');
  if (layoutContent.includes('DashboardProvider')) {
    pass('App wrapped with DashboardProvider');
  } else {
    fail('App wrapped with DashboardProvider', 'DashboardProvider not found in layout');
  }
} catch (e) {
  fail('App wrapped with DashboardProvider', e.message);
}

// Test 8: All 3 tabs exist
try {
  const fs = await import('fs');
  const tabs = ['hero-tab.tsx', 'gallery-tab.tsx', 'reviews-tab.tsx'];
  let allExist = true;
  for (const tab of tabs) {
    const path = `./src/components/dashboard/${tab}`;
    if (!fs.existsSync(path)) {
      allExist = false;
      break;
    }
  }
  if (allExist) {
    pass('All 3 dashboard tabs exist');
  } else {
    fail('All 3 dashboard tabs exist', 'Missing tabs');
  }
} catch (e) {
  fail('All 3 dashboard tabs exist', e.message);
}

// Summary
console.log('\n' + '═'.repeat(50));
console.log(`📊 Results: ${tests.passed} passed, ${tests.failed} failed`);
console.log('═'.repeat(50) + '\n');

if (tests.failed > 0) {
  console.log('❌ Some tests failed. Please check the errors above.\n');
  process.exit(1);
} else {
  console.log('✅ All smoke tests passed!\n');
  console.log('🎉 Dashboard is ready to use:');
  console.log('   1. Run: npm run dev');
  console.log('   2. Visit: http://localhost:3000/ar/dashboard');
  console.log('   3. Edit stats in Hero tab');
  console.log('   4. Visit homepage to see changes!\n');
  process.exit(0);
}
