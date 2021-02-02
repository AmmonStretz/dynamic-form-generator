<template>
  <div class="results">
    <h1>Results</h1>
    <div v-if="status">{{status}}</div>
    <button v-on:click="download_csv">download</button>
    <a v-if="!status || !status.value" href="../">Zurück</a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { WizzardStatus } from "../shared/DynamicForm/Wizzard/Wizzard.dto";
import { ResultsService } from "../shared/Results/services/results.service";

@Component({
  components: {},
})
export default class Results extends Vue {

  private service: ResultsService = new ResultsService();
  public get status(): WizzardStatus {
    return (this as any).$store.state.status;
  }

  mounted() {
    
    // (this as any).$store.dispatch("changeStatus", status);
    // (this as any).$router.push('results');
  }

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
