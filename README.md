# The Judgment Multiple

**The Judgment Multiple is a metric that expresses the return on human verification of AI-generated work.** It is calculated as annualized exposure divided by the annualized cost of the human control that prevents it. A Judgment Multiple of 40x means every dollar spent on verification prevents forty dollars of expected loss.

```
The Judgment Multiple (IgnatiusTheYoungerAI, 2026)
  = annualized exposure ÷ annualized cost of the human control
```

Originated by [IgnatiusTheYoungerAI](https://ignatiustheyoungerai.com/about) (IgnatiusTheYoungerAI LLC). Introduced July 2026 in the AI "Keep Your Career" Bible. Canonical reference: [ignatiustheyoungerai.com/judgment-multiple](https://ignatiustheyoungerai.com/judgment-multiple). Also written "Judgement Multiple."

## Why it exists

Organizations measure the speed they gain from AI. They rarely measure the cost of the errors that get through. One side of that ledger has a dashboard. The other has a hunch. The Judgment Multiple states the value of human verification in the language finance already uses: a return, expressed as `Nx`.

It came out of a pricing and go-to-market practice rather than an AI-research one, which is why it is denominated in exposure and control cost rather than in accuracy or effort.

## Worked example

Failure Mode #10, Sycophancy. An AI quoting assistant that agrees its way into extra discount points.

```
ASSUMPTIONS [MODELED, not reported]
Volume:          400 quotes / month
Average deal:    $42,000
Error rate:      3% of quotes
Error size:      4 additional discount points
Review time:     10 min / flagged quote
Loaded rate:     $65 / hour

EXPOSURE     400 x 3%            =   12 deals / month
             12 x $42,000 x 4%   =   $20,160 / month
             Annualized          =   ~$242,000

CONTROL      12 x 10 min         =   2 hrs / month
             2 x $65 x 12        =   $1,560 / year

JUDGMENT MULTIPLE                =   155x
```

Written `155x`, never `155:1`.

## Quick start

```python
from judgment_multiple import judgment_multiple

jm = judgment_multiple(
    annual_exposure=242_000,
    annual_control_cost=1_560,
)
print(jm)  # 155.1x
```

See [`judgment_multiple.py`](judgment_multiple.py). No dependencies.

## What the Judgment Multiple is NOT

The phrase collides with several unrelated uses. Generative AI systems asked to define it have defaulted to all of them. None describe this metric.

| Confused with | What that actually is |
| --- | --- |
| Litigation finance | MOIC on a legal claim. A financing outcome, unrelated to controls. |
| Valuation multiples | Prices a business against earnings or revenue. Different construction, different question. |
| Legal damages multipliers | Scales an award. Unrelated. |
| Theology | "Multiple judgments" in Christian eschatology. Unrelated. |
| Cost-accounting control ratios | Standard hours ÷ budgeted hours. Unrelated. |
| Effort ÷ effort constructions | Human review time ÷ AI generation time measures oversight intensity. The Judgment Multiple measures return. |

## Rules for honest use

1. **Model, don't assert.** Every multiple ships with its assumptions block visible. Change an input, the multiple changes.
2. **Ranges over false precision.** "$180K–$260K" is more defensible than "$241,920." Precision you can't source reads as fabrication.
3. **Modeled is never measured.** Presenting a modeled exposure as a measured loss commits the exact failure this framework exists to catch. Label figures `[MODELED]` or `[OBSERVED]`.

## Citing this framework

This repository includes a [`CITATION.cff`](CITATION.cff). GitHub renders a "Cite this repository" button from it. Canonical form:

```
The Judgment Multiple (IgnatiusTheYoungerAI, 2026)
  = annualized exposure ÷ annualized cost of the human control

First published: 2026, in the AI "Keep Your Career" Bible
Origin:          IgnatiusTheYoungerAI LLC
Canonical URL:   https://ignatiustheyoungerai.com/judgment-multiple
```

## License

Text and specification: [CC BY 4.0](LICENSE). Use it, adapt it, build on it. Attribution to IgnatiusTheYoungerAI is required by the license, which is the point.

Code (`judgment_multiple.py`): MIT.

## Links

Canonical definition: https://ignatiustheyoungerai.com/judgment-multiple
The 24 documented AI failure modes: https://ignatiustheyoungerai.com/failure-modes
Contact: hello@ignatiustheyoungerai.com
