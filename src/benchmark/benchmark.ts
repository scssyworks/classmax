import { cm } from '../lib/index.js';

interface BenchmarkResult {
  name: string;
  totalOperations: number;
  totalTime: number;
  operationsPerSecond: number;
  averageTimePerOperation: number;
}

class PerformanceBenchmark {
  private warmupIterations = 10000;
  private benchmarkIterations = 1000000;

  private getHighResTime(): bigint {
    return process.hrtime.bigint();
  }

  private nanosToMillis(nanos: bigint): number {
    return Number(nanos) / 1_000_000;
  }

  private warmup(fn: () => void): void {
    console.log('Warming up...');
    for (let i = 0; i < this.warmupIterations; i++) {
      fn();
    }
  }

  private benchmark(name: string, fn: () => void): BenchmarkResult {
    // Warmup
    this.warmup(fn);

    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }

    console.log(`Benchmarking ${name}...`);

    const startTime = this.getHighResTime();

    for (let i = 0; i < this.benchmarkIterations; i++) {
      fn();
    }

    const endTime = this.getHighResTime();
    const totalTimeNanos = endTime - startTime;
    const totalTime = this.nanosToMillis(totalTimeNanos);
    const operationsPerSecond = (this.benchmarkIterations / totalTime) * 1000;
    const averageTimePerOperation = totalTime / this.benchmarkIterations;

    return {
      name,
      totalOperations: this.benchmarkIterations,
      totalTime,
      operationsPerSecond,
      averageTimePerOperation,
    };
  }

  public runBenchmarks(): void {
    console.log('='.repeat(60));
    console.log('ClassMix Performance Benchmark');
    console.log('='.repeat(60));

    const results: BenchmarkResult[] = [];

    // Test scenarios
    const scenarios = [
      {
        name: 'Simple string concatenation',
        fn: () => cm('class1', 'class2', 'class3'),
      },
      {
        name: 'Array input',
        fn: () => cm(['class1', 'class2'], ['class3', 'class4']),
      },
      {
        name: 'Object input (conditional)',
        fn: () => cm({ active: true, disabled: false, primary: true }),
      },
      {
        name: 'Object input (string values)',
        fn: () => cm({ btn: 'primary', text: 'large', border: 'rounded' }),
      },
      {
        name: 'Mixed input types',
        fn: () =>
          cm('base', ['modifier1', 'modifier2'], {
            active: true,
            size: 'large',
          }),
      },
      {
        name: 'Empty/falsy values',
        fn: () => cm('', null, undefined, false, 0, 'valid-class'),
      },
      {
        name: 'Complex nested scenario',
        fn: () =>
          cm(
            'base-class',
            ['modifier1', 'modifier2', ['nested1', 'nested2']],
            {
              'state-active': true,
              'state-disabled': false,
              size: 'large',
              variant: 'primary',
            },
            null,
            undefined,
            'final-class',
          ),
      },
    ];

    // Run benchmarks
    scenarios.forEach((scenario) => {
      const result = this.benchmark(scenario.name, scenario.fn);
      results.push(result);
    });

    // Display results
    this.displayResults(results);
  }

  private displayResults(results: BenchmarkResult[]): void {
    console.log('\n' + '='.repeat(60));
    console.log('BENCHMARK RESULTS');
    console.log('='.repeat(60));

    results.forEach((result, index) => {
      console.log(`\n${index + 1}. ${result.name}`);
      console.log(`   Operations: ${result.totalOperations.toLocaleString()}`);
      console.log(`   Total time: ${result.totalTime.toFixed(2)}ms`);
      console.log(
        `   Ops/sec: ${Math.round(result.operationsPerSecond).toLocaleString()}`,
      );
      console.log(
        `   Avg time/op: ${(result.averageTimePerOperation * 1000).toFixed(4)}μs`,
      );
    });

    // Summary statistics
    const totalOps = results.reduce((sum, r) => sum + r.operationsPerSecond, 0);
    const avgOpsPerSec = totalOps / results.length;
    const fastest = results.reduce((max, r) =>
      r.operationsPerSecond > max.operationsPerSecond ? r : max,
    );
    const slowest = results.reduce((min, r) =>
      r.operationsPerSecond < min.operationsPerSecond ? r : min,
    );

    console.log('\n' + '='.repeat(60));
    console.log('SUMMARY');
    console.log('='.repeat(60));
    console.log(
      `Average ops/sec across all tests: ${Math.round(avgOpsPerSec).toLocaleString()}`,
    );
    console.log(
      `Fastest: ${fastest.name} (${Math.round(fastest.operationsPerSecond).toLocaleString()} ops/sec)`,
    );
    console.log(
      `Slowest: ${slowest.name} (${Math.round(slowest.operationsPerSecond).toLocaleString()} ops/sec)`,
    );
    console.log(
      `Performance ratio: ${(fastest.operationsPerSecond / slowest.operationsPerSecond).toFixed(2)}x`,
    );
  }
}

// Alternative simple benchmark using console.time
export class SimpleBenchmark {
  public static timeFunction<T>(
    name: string,
    fn: () => T,
    iterations: number = 1000000,
  ): T {
    console.time(name);
    let result: T;
    for (let i = 0; i < iterations; i++) {
      result = fn();
    }
    console.timeEnd(name);
    console.log(`Operations: ${iterations.toLocaleString()}`);
    return result!;
  }

  public static async timeFunctionAsync<T>(
    name: string,
    fn: () => Promise<T>,
    iterations: number = 1000,
  ): Promise<T> {
    console.time(name);
    let result: T;
    for (let i = 0; i < iterations; i++) {
      result = await fn();
    }
    console.timeEnd(name);
    console.log(`Operations: ${iterations.toLocaleString()}`);
    return result!;
  }
}

// CLI execution - ES module equivalent of require.main === module
if (import.meta.url === `file://${process.argv[1]}`) {
  const benchmark = new PerformanceBenchmark();
  benchmark.runBenchmarks();
}

export { PerformanceBenchmark };
