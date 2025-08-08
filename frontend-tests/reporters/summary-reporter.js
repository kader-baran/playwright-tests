const chalk = require("chalk");

class SummaryReporter {
  onBegin(config, suite) {
    this.startTime = Date.now();
    this.suite = suite;
    this.lastResultsByTest = new Map();
    this.flakyCandidates = new Set();
    this.testStartTimes = new Map();
  }

  onTestBegin(test) {
    const key = [...test.titlePath(), test.projectName].join(" › ");
    this.testStartTimes.set(key, Date.now());
    const location = test.location
      ? `${test.location.file}:${test.location.line}`
      : "";
    const project = test.projectName ? `[${test.projectName}] ` : "";
    console.log(
      chalk.blueBright(`\n▶ START ${project}${location} — ${test.title}`)
    );
  }

  onTestEnd(test, result) {
    const key = [...test.titlePath(), test.projectName].join(" › ");
    const previous = this.lastResultsByTest.get(key);
    if (
      previous &&
      previous.status !== "passed" &&
      result.status === "passed"
    ) {
      this.flakyCandidates.add(key);
    }
    this.lastResultsByTest.set(key, { status: result.status });

    const startedAt = this.testStartTimes.get(key);
    const durationMs =
      typeof result.duration === "number"
        ? result.duration
        : startedAt
        ? Date.now() - startedAt
        : 0;
    const statusLabel =
      result.status === "passed"
        ? chalk.green("PASSED")
        : result.status === "skipped"
        ? chalk.yellow("SKIPPED")
        : chalk.red(result.status.toUpperCase());
    const project = test.projectName ? `[${test.projectName}] ` : "";
    console.log(
      chalk.white(
        `✔ END ${project}${test.title} — ${statusLabel} (${(
          durationMs / 1000
        ).toFixed(2)}s)`
      )
    );
  }

  onEnd() {
    const durationMs = Date.now() - this.startTime;
    const tests = Array.from(this.lastResultsByTest.values());
    const total = tests.length;
    const passed = tests.filter((t) => t.status === "passed").length;
    const skipped = tests.filter((t) => t.status === "skipped").length;
    const failed = tests.filter(
      (t) =>
        t.status === "failed" ||
        t.status === "timedOut" ||
        t.status === "interrupted"
    ).length;
    const flaky = Array.from(this.flakyCandidates).filter(
      (k) => this.lastResultsByTest.get(k)?.status === "passed"
    ).length;

    const passRate = total ? ((passed / total) * 100).toFixed(1) : "0.0";
    const failRate = total ? ((failed / total) * 100).toFixed(1) : "0.0";

    const line = (label, value) => `${chalk.gray(label)} ${value}`;

    console.log("\n" + chalk.bold("Test Summary"));
    console.log(line("  Total:", chalk.white(total)));
    console.log(line("  Passed:", chalk.green(passed)));
    console.log(
      line("  Failed:", failed ? chalk.red(failed) : chalk.green(failed))
    );
    console.log(
      line("  Skipped:", skipped ? chalk.yellow(skipped) : chalk.white(skipped))
    );
    if (flaky) console.log(line("  Flaky:", chalk.magenta(flaky)));
    console.log(
      line("  Pass rate:", chalk.green(`${passRate}%`)),
      line("Fail rate:", chalk.red(`${failRate}%`))
    );
    console.log(
      line("  Duration:", chalk.cyan(`${(durationMs / 1000).toFixed(2)}s`)) +
        "\n"
    );
  }
}

module.exports = SummaryReporter;
