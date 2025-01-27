function skillsMember() {
  return {
    name: 'John Doe',
    age: 30,
    skills: ['HTML', 'CSS', 'JS'],
    getSkills: function() {
      return this.skills;
    }
  };
}