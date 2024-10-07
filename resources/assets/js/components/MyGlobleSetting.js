class MyGlobleSetting {
  constructor() {
    this.url = 'http://127.0.0.1:8000';
    this.getID = (memberId) => {
      const url = window.location.href; // "http://127.0.0.1:8000/members/edit/1"

      // Regular expression to match the member ID at the end of the URL
      const regex = /\/edit\/(\d+)$/; // Matches "/edit/" followed by digits

      const match = url.match(regex);
      if (match) {
        memberId = match[1]; // "1"
        console.log("log ID:" + memberId); // Outputs: 1
      } else {
        console.log("ID not found");
      }
      return memberId;
    }
  }

}
export default (new MyGlobleSetting);