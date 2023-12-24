<template>
  <TopBar />
  <h1>projects page for the admin</h1>
</template>


<script >
import { defineComponent } from "vue";
import AdminTopBar from "./AdminTopBar.vue";

// Export this component so we can use it from other files
export default defineComponent({
  // The name of this component
  name: "Projects",
  components: { TopBar: AdminTopBar },
});
</script>

