<script setup lang="ts">
interface StatItem {
  target: number
  step: number
  prefix?: string
  suffix?: string
  label: string
}

interface Props {
  stats?: StatItem[]
}

withDefaults(defineProps<Props>(), {
  stats: () => [
    { target: 50, step: 1, label: 'Carreras' },
    { target: 500, step: 50, prefix: '+', label: 'Asignaturas enriquecidas con contenido de Arizona State University' },
    { target: 30, step: 1, prefix: '+', suffix: 'k', label: 'Graduados en diversas áreas profesionales respaldan nuestra excelencia académica' }
  ]
})
</script>

<template>
  <section class="pb-8 pt-0 xl:pb-12 xl:pt-0 bg-white">
    <div class="container mx-auto max-w-[1400px] px-4 md:px-6">
      <div class="grid grid-cols-3 gap-2 md:gap-12 xl:gap-20 text-center items-start">

        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="flex flex-col items-center"
          :class="['reveal', index === 1 ? 'delay-200' : index === 2 ? 'delay-400' : '']"
        >
          <div class="font-futura-bold text-[32px] md:text-[60px] xl:text-[80px] leading-none text-dark flex items-baseline">
            <span v-if="stat.prefix">{{ stat.prefix }}</span>
            <span
              class="js-counter"
              :data-target="stat.target"
              :data-step="stat.step"
            >0</span>
            <span v-if="stat.suffix">{{ stat.suffix }}</span>
          </div>
          <p class="font-futura-bold text-[8px] leading-[1.1] md:text-xs xl:text-base tracking-tight md:tracking-wider mt-2 max-w-[110px] md:max-w-[250px]">
            {{ stat.label }}
          </p>
        </div>

      </div>
    </div>
  </section>
</template>
