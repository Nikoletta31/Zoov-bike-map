<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/map">Map</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
  body,
  html {
    padding: 0;
    margin: 0;
    width: 100%;
    min-height: 100vh;
  }

  body {
    background: rgb(166, 225, 249);
    background: linear-gradient(
      90deg,
      rgba(166, 225, 249, 1) 2%,
      rgba(115, 207, 244, 1) 32%,
      rgba(78, 187, 230, 1) 71%
    );
  }

  #app {
    font-family: "Poppins", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
    margin-bottom: 50px;

    a {
      font-size: 20px;
      font-weight: bold;
      color: #2c3e50;
      text-decoration: none;
      margin-right: 20px;

      &.router-link-exact-active {
        color: #ffffff;
      }
    }
  }
</style>
