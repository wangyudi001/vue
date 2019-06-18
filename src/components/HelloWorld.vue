<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <button @click="all()">getAll</button>
      <button @click="message()">clear</button>
    </div>
    <div>
      <table v-if="hasData" border="1">
        <thead>
          <tr>
            <th>username</th>
            <th>password</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in userList">
            <td>{{item.userName}}</td>
            <td>{{item.userPassword}}</td>
          </tr>
        </tbody>
        
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      userList: [],
      hasData: false
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      console.log(this.$route.query.id);
    });
    // this.all();
  },
  methods: {
    all() {
      this.$http
        .get("http://127.0.0.1:8080/all")
        .then(res => {
          if (res.data.code == "1") {
            this.hasData = false;
            this.$message.error(res.data.attr);
          } else {
            this.hasData = true;
            this.userList = res.data.data;
            console.log(this.userList);
          }
        })
        .catch(() => {
          console.log("unknown error");
        });
    },
    message() {
      this.hasData = false;
      this.userList = [];
      this.$message({
        message: "clear userList...",
        type: "information"
      });
    }
  }
};
</script>

<style scoped>
</style>
