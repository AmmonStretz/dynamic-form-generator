<template>
  <div class="results">
    <h1>Results</h1>
    <button v-on:click="download_csv">download</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ResultsService } from "../shared/Results/services/results.service";

@Component({
  components: {},
})
export default class Results extends Vue {

  private service: ResultsService = new ResultsService();

  download_csv() {
    const data = this.service.generateCSV((this as any).$store.state.status);
    console.log(data);
    
    let csv = "Name,Title\n";
    data.forEach((row) => {
      csv += row.join(",");
      csv += "\n";
    });

    console.log(csv);
    const hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = "people.csv";
    hiddenElement.click();
  }
}
</script>

<style scoped lang="scss">
.results {
}
</style>
