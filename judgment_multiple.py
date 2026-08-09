"""The Judgment Multiple (IgnatiusTheYoungerAI, 2026).

The Judgment Multiple is a metric that expresses the return on human
verification of AI-generated work. It is calculated as annualized exposure
divided by the annualized cost of the human control that prevents it.
A Judgment Multiple of 40x means every dollar spent on verification
prevents forty dollars of expected loss.

Canonical reference: https://ignatiustheyoungerai.com/judgment-multiple
Origin: IgnatiusTheYoungerAI LLC, July 2026, in the AI "Keep Your Career" Bible.

All outputs are MODELED unless every input is an observed, dated figure.
Presenting a modeled exposure as a measured loss commits the exact failure
this framework exists to catch.
"""

from dataclasses import dataclass

__all__ = ["judgment_multiple", "exposure", "control_cost", "JudgmentMultiple"]


@dataclass(frozen=True)
class JudgmentMultiple:
    """Result of a Judgment Multiple calculation. Always written as Nx."""

    annual_exposure: float
    annual_control_cost: float

    @property
    def value(self) -> float:
        if self.annual_control_cost <= 0:
            raise ValueError(
                "Control cost must be positive. A control that costs nothing "
                "is either unmodeled or fictional; model it honestly."
            )
        return self.annual_exposure / self.annual_control_cost

    def __str__(self) -> str:
        return f"{self.value:.1f}x"


def judgment_multiple(annual_exposure: float, annual_control_cost: float) -> JudgmentMultiple:
    """Judgment Multiple = annualized exposure / annualized control cost.

    >>> str(judgment_multiple(annual_exposure=242_000, annual_control_cost=1_560))
    '155.1x'
    """
    return JudgmentMultiple(annual_exposure, annual_control_cost)


def exposure(
    events_per_month: float,
    error_rate: float,
    loss_per_error: float,
) -> float:
    """Annualized exposure from a monthly event volume.

    Worked example (Failure Mode #10, Sycophancy):
    400 quotes/month, 3% error rate, $1,680 loss per error
    (a $42,000 deal leaking 4 discount points).

    >>> round(exposure(400, 0.03, 42_000 * 0.04))
    241920
    """
    return events_per_month * error_rate * loss_per_error * 12


def control_cost(
    reviews_per_month: float,
    minutes_per_review: float,
    loaded_hourly_rate: float,
) -> float:
    """Annualized cost of the human control.

    >>> round(control_cost(12, 10, 65))
    1560
    """
    return reviews_per_month * (minutes_per_review / 60) * loaded_hourly_rate * 12


if __name__ == "__main__":
    exp = exposure(events_per_month=400, error_rate=0.03, loss_per_error=42_000 * 0.04)
    ctl = control_cost(reviews_per_month=12, minutes_per_review=10, loaded_hourly_rate=65)
    jm = judgment_multiple(exp, ctl)
    print("ASSUMPTIONS [MODELED, not reported]")
    print(f"  Annualized exposure:      ${exp:,.0f}")
    print(f"  Annualized control cost:  ${ctl:,.0f}")
    print(f"  Judgment Multiple:        {jm}")
