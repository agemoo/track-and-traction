const week = {
  monday: {
    label: "Monday · Listen",
    purpose: "Find the strongest change in the session.",
    format: "Private review: mark three clips and write one sentence about each.",
    cta: "Choose the one moment that can carry the whole week."
  },
  tuesday: {
    label: "Tuesday · Hook",
    purpose: "Lead with the moment that makes someone stop.",
    format: "A 10–20 second vertical clip with the result first, then a glimpse of the process.",
    cta: "Invite people to listen for one specific detail."
  },
  wednesday: {
    label: "Wednesday · Explain",
    purpose: "Give the musical decision enough context.",
    format: "A short carousel, blog section, or voiceover comparing the early and later take.",
    cta: "Ask which choice feels clearer and why."
  },
  thursday: {
    label: "Thursday · Talk",
    purpose: "Turn publishing into a conversation.",
    format: "Reply to useful comments, share one follow-up detail, or ask another musician about their process.",
    cta: "Collect the language people use for the problem."
  },
  friday: {
    label: "Friday · Perform",
    purpose: "Show the idea working inside the music.",
    format: "The strongest rehearsal or performance excerpt, framed by one sentence of context.",
    cta: "Point interested listeners to the full version or article."
  },
  saturday: {
    label: "Saturday · Connect",
    purpose: "Reach people through relevant participation.",
    format: "Share selectively with a class, ensemble, community, or professional network where the lesson is useful.",
    cta: "Contribute to the group before dropping a link."
  },
  sunday: {
    label: "Sunday · Review",
    purpose: "Decide what deserves another week.",
    format: "A ten-minute review of watch time, useful responses, saves, clicks, and the effort each post required.",
    cta: "Write one thing to repeat and one thing to change."
  }
};

const buttons = [...document.querySelectorAll(".track__day")];
const label = document.querySelector("#track-label");
const purpose = document.querySelector("#track-purpose");
const format = document.querySelector("#track-format");
const cta = document.querySelector("#track-cta");

function selectDay(day, selectedButton) {
  const content = week[day];
  if (!content || !label || !purpose || !format || !cta) return;

  for (const button of buttons) {
    const active = button === selectedButton;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  }

  label.textContent = content.label;
  purpose.textContent = content.purpose;
  format.textContent = content.format;
  cta.textContent = content.cta;
}

for (const button of buttons) {
  button.addEventListener("click", () => selectDay(button.dataset.day, button));
}
