(function () {
    //定义一个类型
    var Person = /** @class */ (function () {
        // 定义一个构造器函数
        function Person(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.fullName = this.firstName + this.lastName;
        }
        return Person;
    }());
    function showFullName(person) {
        return person.firstName + person.lastName;
    }
    var person = new Person("chu", "chuchu");
    console.log(showFullName(person));
})();
