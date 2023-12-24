<template>
  <TopBar />
  <div v-if="popupVisible">
    <Popup :data="themeToOpen" @closePopup="popupVisible = false" />
  </div>
  <div class="page-container">
    <div class="themes-page">
      <h1>page de validation de themes</h1>
      <table ref="table">
        <tr>
          <th>titre et description</th>
          <th>encadreur</th>
          <th>accepter</th>
          <th>rejeter</th>
          <th>plus</th>
        </tr>
        <tr v-for="theme in themes" :key="theme.IdTheme">
          <td>
            <h4>{{ theme.Titre }}</h4>
            <span> {{ theme.Description }} </span>
          </td>
          <td>{{ theme.Nom }} {{ theme.Prenom }}</td>
          <td>
            <button @click="accept(theme.IdTheme)">
              accepter<span>&check;</span>
            </button>
          </td>
          <td>
            <button @click="reject(theme.IdTheme)">
              rejeter<span>x</span>
            </button>
          </td>
          <td><button @click="seeMore(theme.IdTheme)">&gt;</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>


<script>
import { defineComponent } from "vue";
import PopupContainer from "./PopupContainer.vue";
import axios from "axios";
import AdminTopBar from "./AdminTopBar.vue";

// Export this component so we can use it from other files
export default defineComponent({
  // The name of this component
  name: "ValidateThemes",
  // The different components that are used in this component
  components: { Popup: PopupContainer, TopBar: AdminTopBar },
  // The data that this components will manipulate
  data() {
    return {
      themes: [], //as Theme[],
      popupVisible: false,
      themeToOpen: [],
    };
  },
  // When the page loads
  async created() {
    await this.GetTheme();
  },
  // the different methods in this component
  methods: {
    async GetTheme() {
      // Get the data from the server
      try {
        const response = await axios.get("http://localhost:5000/theme");
        var themes = response.data;

        // @ts-ignore
        this.themes = themes.filter((x) => x.Status === "PasEncore");
      } catch (err) {
        console.log(err);
      }

      // Execute the code that will remove the last additional border in the table
      // make sure to run this after getting the data and adding it to the table

      // Wait for the ui to update after changing data
      await this.$nextTick().then(() => {
        // Then change the styles to remove the border
        this.changeStyle();
      });
    },
    // This method is purely for ui
    changeStyle() {
      // Get the table of themes
      var table = this.$refs["table"];

      // Get the children of the last row in the table
      var lastRowChildren = table.children.item(
        table.children.length - 1
      )?.children;

      // If those children aren't equal to null
      if (lastRowChildren) {
        // For each td cell
        for (let i = 0; i < lastRowChildren.length; i++) {
          // Remove the bottom border
          lastRowChildren[i].style.borderBottom = "none";
        }
      }
    },
    // This method will make a theme with the selected id accepted and added to the list of validated themes
    async accept(id) {
      try {
        await axios.put(`http://localhost:5000/theme/${id}`);
        this.GetTheme();
      } catch (err) {
        console.log(err);
      }
    },
    // This method will make the theme with selected id rejected(maybe delete it)
    async reject(id) {
      try {
        await axios.delete(`http://localhost:5000/theme/${id}`);
        this.GetTheme();
      } catch (err) {
        console.log(err);
      }
    },
    // This method opens a pupup that will show more info about the theme with the passed in id
    async seeMore(id) {
      try {
        await axios.get(`http://localhost:5000/theme/${id}`);
        this.GetTheme();
      } catch (err) {
        console.log(err);
      }
      // Set the theme we want to show in the popup
      const res = await axios.get(`http://localhost:5000/theme/${id}`);
      this.themeToOpen = res.data; /*as Theme;*/
      // Show the popup
      this.popupVisible = true;
    },
  },
});
</script>

<style scoped>
html {
  background-color: #fefefe;
  color: #030c17;
}
* {
  margin: 0px;
  padding: 0px;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
}
a {
  transition: ease-in 200ms;
  color: #ff7f22;
  text-decoration: none;
}
a:hover,
a:focus {
  color: #51a6dd;
}
.themes-page {
  margin-left: auto;
  margin-right: auto;
  max-width: 1152px;
  padding: 36px;
}
.themes-page h1 {
  opacity: 100%;
  font-weight: 500;
  font-size: 48px;
  margin-bottom: 72px;
  margin-top: 24px;
}
.themes-page table {
  border: 1px solid #b1b2b2;
  border-radius: 16px;
  width: 100%;
  border-spacing: 0px;
}
.themes-page table tr:first-child th:first-child {
  border-top-left-radius: 9.6px;
}
.themes-page table tr:first-child th:last-child {
  border-top-right-radius: 9.6px;
}
.themes-page table td,
.themes-page table th {
  padding: 9.6px 16px;
}
.themes-page table th {
  background-color: #b1b2b2;
  color: #fefefe;
  padding: 16px;
}
.themes-page table tr * {
  text-align: left;
}
.themes-page table tr td {
  border-bottom: 1px solid #b1b2b2;
  max-width: 504px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
}
.themes-page table tr td h4 {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20.8px;
  font-weight: 500;
}
.themes-page table tr td button {
  transition: ease-in 200ms;
  padding: 0px;
  background-color: transparent;
  border: none;
  font-size: 16px;
}
.themes-page table tr td button:focus,
.themes-page table tr td button:hover {
  color: #51a6dd;
  cursor: pointer;
}
.themes-page table tr td:nth-child(1) span {
  opacity: 50%;
}
.themes-page table tr :nth-child(2) {
  max-width: 216px;
}
.themes-page table tr :nth-child(3) {
  padding-left: 72px;
  padding-right: 0px;
}
.themes-page table tr :nth-child(3) span {
  font-weight: 800;
  margin: 9.6px;
  color: green;
}
.themes-page table tr :nth-child(4) {
  padding-left: 0px;
}
.themes-page table tr :nth-child(4) span {
  font-weight: 800;
  margin: 9.6px;
  color: red;
}
.themes-page table tr :nth-child(5) button {
  padding: 0px 9.6px;
  font-family: sans-serif;
  transform: scale(1, 2);
}
</style>
