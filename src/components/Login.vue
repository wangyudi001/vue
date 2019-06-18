<template>
  <div id="a1">
    <div>
      <input v-model="username" type="text" placeholder="empty">
      <input v-model="password" type="password" placeholder="empty">
    </div>
    <div>
      <button @click="login()">login</button>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },

  methods: {
    login: function() {
      var param = {
        userName: this.username,
        userPassword: this.password
      };
      this.$http
        .post("http://127.0.0.1:8080/login", param)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 0) {
            window.localStorage.setItem("token", res.data.data.token);
            this.$router.push("/hello?id=1");
          } else {
            this.$message.error(res.data.attr);
            this.password = "";
          }
        })
        .catch(() => {
          console.log("error");
        });
    }
  }
};
</script>

<style scoped>
</style>
