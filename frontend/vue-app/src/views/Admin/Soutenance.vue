<template>
  <TopBar />
  <h1>page de soutenance pour l'admin</h1>
</template>




<script >
import { defineComponent } from "vue";
import AdminTopBar from "./AdminTopBar.vue";

// Export this component so we can use it from other files
export default defineComponent({
  // The name of this component
  name: "Soutenance",
  components: { TopBar: AdminTopBar },
});
</script>

