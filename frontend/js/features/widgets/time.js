export const startClock = () => {
  function updateDateTime() {
    const now = new Date();
    const dateTimeElement = document.getElementById("dateTime");

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    if (dateTimeElement) {
      dateTimeElement.textContent = now.toLocaleString("en-US", options);
    }
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);
};
