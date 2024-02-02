class DoctorModel {
  constructor(id, name, age, x, y, speciality) {
      this.id = id;
      this.name = name;
      this.age = age;
      this.x = x;
      this.y = y;
      this.speciality = speciality;
  }

  toString() {
      return `${this.name}, ${this.age} years old, specializing in ${this.speciality}`;
  }
}

module.exports = DoctorModel;