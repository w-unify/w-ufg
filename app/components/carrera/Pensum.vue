<script setup lang="ts">
interface PensumMateria {
  nombre: string
  esASU: boolean
}

interface PensumCicloResolved {
  nombreCiclo: string
  esASU: boolean
  materias: PensumMateria[]
}

interface Props {
  sectionTitle?: string
  ciclos?: PensumCicloResolved[]
  btnNombre?: string
  btnUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  sectionTitle: 'Pensum',
  ciclos: () => [],
  btnNombre: 'DESCARGAR PENSUM',
  btnUrl: ''
})

const asuColspan = computed(() => props.ciclos?.filter(c => c.esASU).length ?? 0)
const hasAsuCiclos = computed(() => asuColspan.value > 0)
const normalColspan = computed(() => (props.ciclos?.length ?? 0) - asuColspan.value)

const maxMaterias = computed(() => {
  if (!props.ciclos?.length) return 0
  return Math.max(...props.ciclos.map(c => c.materias?.length ?? 0))
})

function getMateria(ciclo: PensumCicloResolved, rowIdx: number): PensumMateria | null {
  return ciclo.materias?.[rowIdx - 1] ?? null
}
</script>

<template>
  <section class="pt-8 pb-16 xl:py-24 bg-white">
    <div class="container mx-auto max-w-[1400px] px-6 text-center">
      <h2 class="heading-2 text-primary mb-2 xl:mb-6 reveal delay-200">{{ sectionTitle }}</h2>

      <div v-if="ciclos && ciclos.length > 0" class="relative mb-12">
        <div class="overflow-x-auto pb-6 pt-10">
          <table class="border-separate border-spacing-1 xl:border-spacing-[4px] mx-auto min-w-full">
            <thead>
              <!-- Fila maestra ASU -->
              <tr v-if="hasAsuCiclos">
                <th v-if="normalColspan > 0" :colspan="normalColspan" class="p-0 bg-transparent"></th>
                <th :colspan="asuColspan" class="p-0">
                  <div class="header-master-asu">
                    CICLOS A CURSAR EN ASU
                    <span class="info-icon group">
                      i
                      <div class="tooltip">Contenido enriquecido con ASU</div>
                    </span>
                  </div>
                </th>
              </tr>
              <!-- Fila de nombres de ciclo -->
              <tr>
                <th v-for="(ciclo, idx) in ciclos" :key="idx" class="p-0">
                  <div :class="ciclo.esASU ? 'header-cell-asu-sub' : 'header-cell'">
                    {{ ciclo.nombreCiclo }}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rowIdx in maxMaterias" :key="rowIdx">
                <td v-for="(ciclo, colIdx) in ciclos" :key="colIdx">
                  <div
                    v-if="getMateria(ciclo, rowIdx)"
                    :class="ciclo.esASU ? 'pensum-cell-asu' : 'pensum-cell'"
                  >
                    {{ getMateria(ciclo, rowIdx)!.nombre }}
                    <span v-if="getMateria(ciclo, rowIdx)!.esASU" class="dot-asu"></span>
                  </div>
                  <div
                    v-else
                    :class="ciclo.esASU ? 'pensum-cell-asu' : 'pensum-cell'"
                    style="visibility:hidden;"
                  >&nbsp;</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Botón descargar -->
      <div class="flex justify-center reveal delay-600">
        <a
          v-if="btnUrl"
          :href="btnUrl"
          target="_blank"
          rel="noopener"
          class="btn-secondary btn-sm xl:btn-nm group"
        >
          <span>{{ btnNombre }}</span>
          <div class="btn-circle"></div>
        </a>
        <button v-else class="btn-secondary btn-sm xl:btn-nm group" disabled>
          <span>{{ btnNombre }}</span>
          <div class="btn-circle"></div>
        </button>
      </div>
    </div>
  </section>
</template>
