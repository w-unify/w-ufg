<script setup lang="ts">
interface CostItem {
  label: string
  amount: string
  isBold?: boolean
}

interface Props {
  title?: string
  items?: CostItem[]
  totalLabel?: string
  totalAmount?: string
  disclaimers?: string[]
}

withDefaults(defineProps<Props>(), {
  title: 'Valor del semestre',
  items: () => [
    { label: 'Matricula', amount: '$200' },
    { label: 'Cuota 01 - Ciclo Académico', amount: '$206', isBold: true },
    { label: 'Gastos de Administración', amount: '$30' },
    { label: 'Curso Propedéutico', amount: '$40' },
    { label: 'Costo de Inscripción al Ciclo', amount: '$436' },
    { label: 'Ciclo Académico (Pagadero en 5 cuotas de $108.00 c/u)', amount: '$1,030' }
  ],
  totalLabel: 'Costo Global del Ciclo de Admisión',
  totalAmount: '$1,506',
  disclaimers: () => [
    '* Entiendo y acepto que la cuota mensual, aranceles y laboratorios podrían incrementar hasta un 5% cada año que duren mis estudios.',
    '* Aranceles vigentes hasta el 31 de julio del 2026. A partir de esa fecha, se aplicará un ajuste en los montos.'
  ]
})
</script>

<template>
  <section class="bg-white py-12 xl:py-16 px-6 xl:px-0">
    <div class="container mx-auto max-w-[1400px]">
      <h2 class="hidden xl:block heading-2 !text-primary mb-10 reveal">{{ title }}</h2>

      <div class="max-w-[850px] mx-auto border border-[#3A3D3B] rounded-card p-6 md:p-8 xl:px-12 xl:py-10 reveal delay-200">
        <h2 class="xl:hidden font-futura-bold text-primary text-3xl text-center mb-8">{{ title }}</h2>

        <div class="flex flex-col gap-3 xl:gap-4">
          <div v-for="(item, index) in items" :key="index" class="flex justify-between items-center">
            <p :class="[item.isBold ? 'font-futura-bold' : 'font-futura', 'text-dark leading-[1.2] text-base xl:text-lg']">
              {{ item.label }}
            </p>
            <p :class="[item.isBold ? 'font-futura-bold' : '', 'text-dark text-base xl:text-lg']">
              {{ item.amount }}
            </p>
          </div>

          <div class="border-t border-[#3A3D3B] mt-4 pt-6 flex justify-between items-center">
            <p class="font-futura-bold text-accent text-base leading-[1.2] xl:text-lg text-left max-w-[200px] md:max-w-none">
              {{ totalLabel }}
            </p>
            <p class="font-futura-bold text-accent text-base xl:text-lg">{{ totalAmount }}</p>
          </div>
        </div>
      </div>

      <div class="max-w-[850px] mx-auto mt-4 space-y-3">
        <p v-for="(note, index) in disclaimers" :key="index" class="text-[13px] xl:text-[15px] leading-relaxed text-dark/70">
          {{ note }}
        </p>
      </div>
    </div>
  </section>
</template>
