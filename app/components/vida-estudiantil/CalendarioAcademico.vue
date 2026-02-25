<script setup lang="ts">
interface CalendarioEvent {
  label: string
  type: string
  color: string
  date?: string
  start?: string
  end?: string
}

interface Props {
  titulo?: string
  events?: CalendarioEvent[]
}

const props = withDefaults(defineProps<Props>(), {
  titulo: 'Calendario Académico',
  events: () => [],
})

const today = new Date()
const currentYear = ref(today.getFullYear())
const currentMonth = ref(today.getMonth()) // 0-based

const MONTHS_ES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
]
const DAYS_SHORT = ['L','M','M','J','V','S','D']

const monthLabel = computed(() => MONTHS_ES[currentMonth.value])

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

// Build calendar grid (Mon-first)
const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  // weekday 0=Sun...6=Sat → convert to Mon-first (0=Mon...6=Sun)
  const startOffset = (firstDay.getDay() + 6) % 7
  const days: (number | null)[] = []
  for (let i = 0; i < startOffset; i++) days.push(null)
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(d)
  return days
})

function dateStr(day: number) {
  const y = currentYear.value
  const m = String(currentMonth.value + 1).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function getEventsForDay(day: number): CalendarioEvent[] {
  const ds = dateStr(day)
  return props.events.filter(ev => {
    if (ev.date) return ev.date === ds
    if (ev.start && ev.end) return ds >= ev.start && ds <= ev.end
    return false
  })
}

function getPrimaryEvent(day: number): CalendarioEvent | null {
  const evs = getEventsForDay(day)
  if (!evs.length) return null
  const nonClases = evs.filter(e => e.type !== 'clases')
  return nonClases.length ? nonClases[0] : evs[0]
}

function getSecondaryEvent(day: number): CalendarioEvent | null {
  const evs = getEventsForDay(day)
  if (evs.length < 2) return null
  const primary = getPrimaryEvent(day)
  const found = evs.find(e => e !== primary)
  return found !== undefined ? found : null
}

function safeStr(s: string | undefined): string { return s ?? '' }

// Legend: unique events visible in this month
const legendEvents = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const seen = new Set<string>()
  const result: CalendarioEvent[] = []
  for (const ev of props.events) {
    const key = ev.label + ev.color
    if (seen.has(key)) continue
    // check if event overlaps this month
    const monthStart = `${year}-${String(month + 1).padStart(2,'0')}-01`
    const monthEnd = `${year}-${String(month + 1).padStart(2,'0')}-${new Date(year, month + 1, 0).getDate()}`
    if (ev.date) {
      if (ev.date >= monthStart && ev.date <= monthEnd) {
        seen.add(key); result.push(ev)
      }
    } else if (ev.start && ev.end) {
      if (ev.start <= monthEnd && ev.end >= monthStart) {
        seen.add(key); result.push(ev)
      }
    }
  }
  return result
})

function formatRange(ev: CalendarioEvent) {
  if (ev.date) return formatDate(ev.date)
  if (ev.start && ev.end) {
    if (ev.start === ev.end) return formatDate(ev.start)
    return `${formatDate(safeStr(ev.start))} al ${formatDate(safeStr(ev.end))}`
  }
  return ''
}

function formatDate(ds: string) {
  const [, m, d] = ds.split('-')
  return `${parseInt(d)} ${MONTHS_ES[parseInt(m) - 1].substring(0, 3).toUpperCase()}`
}
</script>

<template>
  <section id="calendario" class="py-16 xl:py-24 bg-muted">
    <div class="container mx-auto px-6">
      <div class="text-center mb-10">
        <h2 class="heading-2 text-dark mb-6">{{ titulo }}</h2>
      </div>

      <div class="flex flex-col lg:flex-row gap-5 xl:gap-10 max-w-[1100px] mx-auto items-start">

        <!-- Calendario -->
        <div class="w-full lg:w-1/2">
          <div class="flex items-center justify-between mb-4 px-4">
            <button class="text-dark/40 hover:text-primary transition-colors" @click="prevMonth">
              <svg class="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
            <h3 class="font-futura-bold text-xl text-dark capitalize">{{ monthLabel }} {{ currentYear }}</h3>
            <button class="text-dark/40 hover:text-primary transition-colors" @click="nextMonth">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          <div class="bg-white border-2 border-gray-200 rounded-big h-[315px] p-6">
            <!-- Header días -->
            <div class="grid grid-cols-7 gap-1 text-center mb-4">
              <div v-for="d in DAYS_SHORT" :key="d" class="text-[11px] font-bold text-dark/40">{{ d }}</div>
            </div>
            <!-- Días -->
            <div class="grid grid-cols-7 gap-y-3 text-center">
              <div v-for="(day, i) in calendarDays" :key="i" class="flex flex-col items-center">
                <template v-if="day !== null">
                  <div
                    class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                    :style="getPrimaryEvent(day) ? { backgroundColor: getPrimaryEvent(day)!.color, color: '#fff' } : { color: '#1a1a2e' }"
                  >
                    {{ day }}
                  </div>
                  <span
                    v-if="getSecondaryEvent(day)"
                    class="block w-1.5 h-1.5 rounded-full mt-0.5"
                    :style="{ backgroundColor: getSecondaryEvent(day)!.color }"
                  />
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- Leyenda -->
        <div class="w-full lg:w-1/2 bg-white border-2 border-gray-200 rounded-big p-8 h-[360px] flex flex-col">
          <div class="overflow-y-auto pr-2 flex-grow custom-scrollbar">
            <div v-if="legendEvents.length" class="flex flex-col gap-3">
              <div v-for="(ev, i) in legendEvents" :key="i" class="flex items-start gap-3">
                <span
                  class="shrink-0 w-3 h-3 rounded-full mt-1"
                  :style="{ backgroundColor: ev.color }"
                />
                <div>
                  <p class="font-futura-bold text-dark text-sm leading-tight">{{ ev.label }}</p>
                  <p class="text-dark/50 text-xs mt-0.5">{{ formatRange(ev) }}</p>
                </div>
              </div>
            </div>
            <p v-else class="text-dark/40 text-sm text-center pt-8">Sin eventos este mes</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
