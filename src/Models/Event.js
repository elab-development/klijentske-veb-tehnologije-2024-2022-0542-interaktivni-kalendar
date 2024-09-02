class Event {
  constructor(name, date, description) {
    this.name = name;
    this.date = date;
    this.description = description;
  }

  getEventDetails() {
    return `${this.name} is scheduled on ${this.date}. Details: ${this.description}`;
  }
}

export default Event;
