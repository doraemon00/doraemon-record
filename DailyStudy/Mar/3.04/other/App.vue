<template>
  <h1>count: {{ countRef }}</h1>
  <p>
    <button @click="increase">increase</button>
    <button @click="decrease">decrease</button>
  </p>
</template>

<script>
import { ref } from "vue";

function useCount() {
  let countRef = ref(0);
  const increase = () => {
    countRef.value++;
  };
  const decrease = () => {
    countRef.value--;
  };
  return {
    countRef,
    increase,
    decrease,
  };
}

export default {
  setup() {
    //在所有生命周期钩子函数之前调用
    // consol .log(this) //undefined

    //setup中，count是一个对象
    //实例代理中，count是一个count.value

    return {
      ...useCount(),
    };
  },
};
</script>
