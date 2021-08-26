//接口
(function () {
    function showFullName(person) {
        return person.firstName + person.lastName;
    }
    // 定义一个对象
    var person = {
        firstName: "东方",
        lastName: "不败",
    };
    console.log(showFullName(person));
})();
