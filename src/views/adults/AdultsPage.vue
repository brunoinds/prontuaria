<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>Prontuário — Adultos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <article class="viewport">
        <main class="viewport-main">
          <header class="main-header">
            <h1 class="main-title">Montagem rápida</h1>
            <p class="main-subtitle">
              Toque em Add para incluir no texto à direita. Use os acordeões para focar em cada bloco.
            </p>
          </header>

          <ion-accordion-group v-model="openSections" :multiple="true" class="sections-accordion">
            <ion-accordion value="history">
              <ion-item slot="header" color="light" lines="full" class="accordion-header-item">
                <ion-icon :icon="readerOutline" slot="start" aria-hidden="true" />
                <ion-label>
                  <h2 class="accordion-title">História</h2>
                  <p class="accordion-subtitle">Anamnese e exame físico</p>
                </ion-label>
              </ion-item>
              <div slot="content" class="accordion-content">
                <ion-list lines="full" class="accordion-list">
                  <ion-item
                    v-for="item in anamnesisAndPhysicalExam"
                    :key="item.title"
                    button
                    :detail="false"
                    @click="commands.addPhysicalExam(item.text)"
                  >
                    <ion-label>
                      <h3 class="item-title">{{ item.title }}</h3>
                    </ion-label>
                    <ion-button slot="end" size="small" fill="solid" @click.stop="commands.addPhysicalExam(item.text)">
                      Add
                    </ion-button>
                  </ion-item>
                </ion-list>
              </div>
            </ion-accordion>

            <ion-accordion value="prescription">
              <ion-item slot="header" color="light" lines="full" class="accordion-header-item">
                <ion-icon :icon="medkitOutline" slot="start" aria-hidden="true" />
                <ion-label>
                  <h2 class="accordion-title">Prescrição</h2>
                  <p class="accordion-subtitle">Na unidade</p>
                </ion-label>
              </ion-item>
              <div slot="content" class="accordion-content">
                <ion-list lines="full" class="accordion-list">
                  <ion-item
                    v-for="item in servicePrescriptions"
                    :key="item.name"
                    button
                    :detail="false"
                    @click="commands.addServicePrescription(item)"
                  >
                    <ion-label>
                      <h3 class="item-title">{{ item.name }}</h3>
                      <p class="item-meta">{{ item.dosis }} {{ item.unit }}</p>
                    </ion-label>
                    <ion-select
                      class="via-select"
                      label="Via"
                      :aria-label="'Via de administração — ' + item.name"
                      interface="popover"
                      :value="currentServiceVia(item)"
                      @ion-change="(ev: CustomEvent) => setServiceVia(item, String(ev.detail.value))"
                      @click.stop
                    >
                      <ion-select-option v-for="via in item.vias" :key="via" :value="via">
                        {{ via }}
                      </ion-select-option>
                    </ion-select>
                    <ion-button slot="end" size="small" fill="solid" @click.stop="commands.addServicePrescription(item)">
                      Add
                    </ion-button>
                  </ion-item>
                </ion-list>
              </div>
            </ion-accordion>

            <ion-accordion value="home">
              <ion-item slot="header" color="light" lines="full" class="accordion-header-item">
                <ion-icon :icon="documentTextOutline" slot="start" aria-hidden="true" />
                <ion-label>
                  <h2 class="accordion-title">Receituário</h2>
                  <p class="accordion-subtitle">Domiciliar por CID</p>
                </ion-label>
              </ion-item>
              <div slot="content" class="accordion-content">
                <ion-list lines="full" class="accordion-list">
                  <ion-item
                    v-for="item in homePrescriptions"
                    :key="item.diagnosis"
                    button
                    :detail="false"
                    @click="commands.addHomePrescription(item)"
                  >
                    <ion-label>
                      <h3 class="item-title">{{ item.diagnosis }}</h3>
                    </ion-label>
                    <ion-button slot="end" size="small" fill="solid" @click.stop="commands.addHomePrescription(item)">
                      Add
                    </ion-button>
                  </ion-item>
                </ion-list>
              </div>
            </ion-accordion>
          </ion-accordion-group>
        </main>

        <aside class="viewport-aside">
          <div class="aside-inner">
            <section class="preview-section">
              <div class="preview-section-head">
                <ion-icon :icon="eyeOutline" aria-hidden="true" />
                <span>Prontuário</span>
              </div>
              <div class="preview-card preview-html" v-html="rendered.clinicalData"></div>
            </section>
            <section class="preview-section">
              <div class="preview-section-head">
                <ion-icon :icon="documentTextOutline" aria-hidden="true" />
                <span>Receituário</span>
              </div>
              <div class="preview-card preview-html" v-html="rendered.homePrescription"></div>
            </section>
          </div>
        </aside>
      </article>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonIcon,
  IonSelect,
  IonSelectOption,
} from '@ionic/vue';
import { documentTextOutline, eyeOutline, medkitOutline, readerOutline } from 'ionicons/icons';
import { anamnesisAndPhysicalExam } from '@/data/anamnesis-and-physical-exam/AnamnesisAndPhysicalExam';
import { homePrescriptions } from '@/data/prescriptions/HomePrescriptions';
import { servicePrescriptions } from '@/data/prescriptions/ServicePrescriptions';
import { computed, onMounted, ref } from 'vue';

const openSections = ref<string[]>(['history']);

const dynamicContent = ref({
  clinicalData: {
    anamnesis: '',
    physicalExam: '',
    diagnosis: '',
    conduct: '',
    servicePrescription: '',
    homePrescription: '',
  },
});

const rendered = computed(() => {
  return {
    clinicalData: (() => {
      let html = '';
      html += `${dynamicContent.value.clinicalData.anamnesis} <br><br><b>AO EXAME FÍSICO:</b> <br>${dynamicContent.value.clinicalData.physicalExam} <br><br><b>HD:</b> ${dynamicContent.value.clinicalData.diagnosis} <br><br><b>CONDUTA:</b><br>${dynamicContent.value.clinicalData.conduct} <br>`;
      if (dynamicContent.value.clinicalData.servicePrescription) {
        html += `<br><br><b><u>PRESCRIÇÃO NA UNIDADE:</u><ul>${dynamicContent.value.clinicalData.servicePrescription}</ul></b>`;
      }
      return html;
    })(),
    homePrescription: dynamicContent.value.clinicalData.homePrescription,
  };
});

type ServicePrescriptionItem = (typeof servicePrescriptions)[number];
type HomePrescriptionItem = (typeof homePrescriptions)[number];

const serviceViaSelection = ref<Record<string, string>>({});

function currentServiceVia(item: ServicePrescriptionItem): string {
  return serviceViaSelection.value[item.name] ?? item.vias[0];
}

function setServiceVia(item: ServicePrescriptionItem, via: string) {
  serviceViaSelection.value = { ...serviceViaSelection.value, [item.name]: via };
}

const commands = {
  addPhysicalExam: (data: string) => {
    dynamicContent.value.clinicalData.physicalExam += data + '<br>';
  },

  addServicePrescription: (item: ServicePrescriptionItem) => {
    const via = currentServiceVia(item);
    dynamicContent.value.clinicalData.servicePrescription += `<li>${item.name} ${item.dosis} ${item.unit} — ${via}</li>`;
  },

  addHomePrescription: (item: HomePrescriptionItem) => {
    const block = dynamicContent.value.clinicalData.homePrescription ? '<br><br>' : '';
    dynamicContent.value.clinicalData.homePrescription += `${block} ${item.text.trim()}`;
  },

  resetAnamnesis: () => {
    dynamicContent.value.clinicalData.anamnesis = 'PACIENTE REFERE QUE HÁ ';
  },
  resetConduct: () => {
    dynamicContent.value.clinicalData.conduct =
      'ORIENTO SINAIS DE ALARME E RETORNO SE PRESENÇA DOS MESMOS. ORIENTO RETORNO VIA UBS PARA SEGUIMENTO. PRESCREVO SINTOMÁTICOS. PACIENTE COMPREENDE DIAGNÓSTICO E TRATAMENTO E COMPACTUA.';
  },
};

onMounted(() => {
  commands.resetAnamnesis();
  commands.resetConduct();
});
</script>

<style scoped lang="scss">
.viewport {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  min-height: 100%;
  gap: 0;
}

.viewport-main {
  flex: 0 0 65%;
  width: 65%;
  max-width: 65%;
  min-width: 0;
  padding: 1rem 1rem 2rem;
  box-sizing: border-box;
}

.main-header {
  margin-bottom: 1rem;
}

.main-title {
  margin: 0 0 0.35rem;
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ion-text-color);
}

.main-subtitle {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.45;
  color: var(--ion-color-medium);
}

.sections-accordion {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--ion-color-step-150, rgba(0, 0, 0, 0.08));
}

.accordion-header-item {
  --min-height: 56px;
}

.accordion-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.accordion-subtitle {
  margin: 0.15rem 0 0;
  font-size: 0.75rem;
  color: var(--ion-color-medium);
}

.accordion-content {
  background: var(--ion-background-color);
}

.accordion-list {
  padding: 0;
  margin: 0;
}

.item-title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
}

.item-meta {
  margin: 0.25rem 0 0;
  font-size: 0.8rem;
  color: var(--ion-color-medium);
}

.via-select {
  max-width: 5.5rem;
  margin-inline-end: 0.25rem;
  font-size: 0.8rem;
}

.viewport-aside {
  flex: 1 1 35%;
  min-width: 0;
  box-sizing: border-box;
  background: var(--ion-color-step-50, var(--ion-color-light));
  border-left: 1px solid var(--ion-color-step-150, rgba(0, 0, 0, 0.08));
}

.aside-inner {
  position: sticky;
  top: 0;
  padding: 1rem 1rem 2rem;
  box-sizing: border-box;
  max-height: 100%;
  overflow: auto;
}

.preview-section {
  margin-bottom: 1.25rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.preview-section-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ion-color-medium);
}

.preview-card {
  border-radius: 10px;
  padding: 0.875rem 1rem;
  background: var(--ion-background-color);
  border: 1px solid var(--ion-color-step-150, rgba(0, 0, 0, 0.08));
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.preview-html {
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--ion-text-color);

  :deep(ul) {
    margin: 0.5rem 0 0 1rem;
    padding: 0;
  }

  :deep(li) {
    margin-bottom: 0.25rem;
  }
}

@media (max-width: 768px) {
  .viewport {
    flex-direction: column;
  }

  .viewport-main {
    flex: 1 1 auto;
    width: 100%;
    max-width: none;
  }

  .viewport-aside {
    border-left: none;
    border-top: 1px solid var(--ion-color-step-150, rgba(0, 0, 0, 0.08));
  }

  .aside-inner {
    position: relative;
    max-height: none;
  }
}
</style>
