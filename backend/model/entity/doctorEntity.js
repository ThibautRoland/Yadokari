class DoctorEntity {
  constructor(id, name, age, x, y, speciality_key) {
      this.id = id;
      this.name = name;
      this.age = age;
      this.x = x;
      this.y = y;
      this.speciality_key = speciality_key;
  }

  toString() {
      return `${this.name}, ${this.age} years old, specializing in ${this.speciality_key}`;
  }
}

module.exports = DoctorEntity;