<template>
  <div>
    <v-card
        class="pa-4"
        flat
        height="300px"
    >
      <v-toolbar
          dense
          floating
      >
        <v-text-field
            hide-details
            single-line
            name="service"
            label="Rechercher un service"
        ></v-text-field>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
  </div>
</template>

<script>
export default {
name: "SearchBar.vue"
}
</script>

<style scoped>

</style>
