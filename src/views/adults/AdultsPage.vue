<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <article class="viewport">
        <main>
          <header>
            <h1>Prontuário</h1>
          </header>
          <main>
            
            <ion-list-header>História</ion-list-header>
            <ion-list>
              <ion-item v-for="item in anamnesisAndPhysicalExam" :key="item.title" @click="commands.addPhysicalExam(item.text)">
                <ion-label>
                  <h2><b>{{ item.title }}</b></h2>
                </ion-label>
                <ion-button slot="end" size="small">Add</ion-button>
              </ion-item>
            </ion-list>
            <br>

            <ion-list-header>Prescrição</ion-list-header>
            <ion-list>
              <ion-item
                v-for="item in servicePrescriptions"
                :key="item.name"
                @click="commands.addServicePrescription(item)"
              >
                <ion-label>
                  <h2><b>{{ item.name }}</b></h2>
                  <p>{{ item.dosis }} {{ item.unit }}</p>
                </ion-label>
                <ion-button slot="end" size="small" @click.stop="commands.addServicePrescription(item)">Add</ion-button>
              </ion-item>
            </ion-list>

            <ion-list-header>Receituário</ion-list-header>
            <ion-list>
              <ion-item
                v-for="item in homePrescriptions"
                :key="item.diagnosis"
                @click="commands.addHomePrescription(item)"
              >
                <ion-label>
                  <h2><b>CID {{ item.diagnosis }}</b></h2>
                </ion-label>
                <ion-button slot="end" size="small" @click.stop="commands.addHomePrescription(item)">Add</ion-button>
              </ion-item>
            </ion-list>
          </main>
        </main>
        <aside>
          <ion-list-header>Visualização Prontuário</ion-list-header>
          <p v-html="rendered.clinicalData"></p>
          <br>
          <ion-list-header>Visualização Receituário</ion-list-header>
          <p v-html="rendered.homePrescription"></p>
          <br>
        </aside>
      </article>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { anamnesisAndPhysicalExam } from '@/data/anamnesis-and-physical-exam/AnamnesisAndPhysicalExam';
import { homePrescriptions } from '@/data/prescriptions/HomePrescriptions';
import { servicePrescriptions } from '@/data/prescriptions/ServicePrescriptions';
import { computed, onMounted, ref } from 'vue';


const dynamicContent = ref({
  clinicalData: {
    anamnesis: '',
    physicalExam: '',
    diagnosis: '',
    conduct: '',
    servicePrescription: '',
    homePrescription: ''
  }
})

const rendered = computed(() => {
  return {
    clinicalData: (() => {
      let html = '';
      html += `${dynamicContent.value.clinicalData.anamnesis} <br><br>AO EXAME FÍSICO: <br>${dynamicContent.value.clinicalData.physicalExam} <br><br>HD: ${dynamicContent.value.clinicalData.diagnosis} <br><br>CONDUTA:<br>${dynamicContent.value.clinicalData.conduct} <br>`;
      if (dynamicContent.value.clinicalData.servicePrescription) {
        html += `<br><br><b><u>PRESCRIÇÃO NA UNIDADE:</u><ul>${dynamicContent.value.clinicalData.servicePrescription}</ul></b>`;
      }
      return html;
    })(),
    homePrescription: dynamicContent.value.clinicalData.homePrescription,
  }
})


type ServicePrescriptionItem = (typeof servicePrescriptions)[number];
type HomePrescriptionItem = (typeof homePrescriptions)[number];

const commands = {
  addPhysicalExam: (data: string) => {
    dynamicContent.value.clinicalData.physicalExam += data + '<br>';
  },

  addServicePrescription: (item: ServicePrescriptionItem) => {
    dynamicContent.value.clinicalData.servicePrescription += `<li>${item.name} ${item.dosis} ${item.unit}</li>`;
  },

  addHomePrescription: (item: HomePrescriptionItem) => {
    const block = dynamicContent.value.clinicalData.homePrescription ? '<br><br>' : '';
    dynamicContent.value.clinicalData.homePrescription += `${block} ${item.text.trim()}`;
  },

  resetAnamnesis: () => {
    dynamicContent.value.clinicalData.anamnesis = 'PACIENTE REFERE QUE HÁ ';
  },
  resetConduct: () => {
    dynamicContent.value.clinicalData.conduct = 'ORIENTO SINAIS DE ALARME E RETORNO SE PRESENÇA DOS MESMOS. ORIENTO RETORNO VIA UBS PARA SEGUIMENTO. PRESCREVO SINTOMÁTICOS. PACIENTE COMPREENDE DIAGNÓSTICO E TRATAMENTO E COMPACTUA.';
  }
}


onMounted(() => {
  commands.resetAnamnesis();
  commands.resetConduct();
})

</script>

<style scoped lang="scss">

.viewport {
  display: flex;
  flex-direction: row;
  height: 100%;
}


</style>
