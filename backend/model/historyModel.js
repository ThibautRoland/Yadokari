class historyModel {
    constructor(doctorName, dateSearched) {
        this.doctorName = doctorName;
        this.dateSearched = dateSearched;
    }
  
    toString() {
        return `doctorName ${this.doctorName} date ${this.dateSearched}`;
    }
  }
  
  module.exports = historyModel;