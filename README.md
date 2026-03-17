# ResizablePanel

Легковесный класс для создания изменяемых по высоте панелей в Vue 3.

## 📥 Установка
просто скопируй файл `resizablePanel.ts` в свой проект.

## 🚀 Использование

```vue
<template>
  <div 
    class="voicePanel" 
    ref="panel" 
    :style="{ height: panelHeight + 'px' }"
  >
    <div class="voicePanel-content">
      <slot></slot>
    </div>
    <div class="resize-handle" @mousedown="resizable.start"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import ResizablePanel from "@/app/service/resizablePanel";

const panel = ref<HTMLElement | null>(null);
const resizable = new ResizablePanel(panel);
const panelHeight = computed(() => resizable.panelHeight.value);

onMounted(() => {
  resizable.init();
});

onUnmounted(() => {
  resizable.destroy();
});
</script>

<style scoped>
.voicePanel {
  position: relative;
  min-height: 200px;
  max-height: 600px;
}

.resize-handle {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 8px;
  cursor: ns-resize;
  background: transparent;
}
</style>
```

## 📖 API

### Конструктор

```ts
new ResizablePanel(panel: Ref<HTMLElement | null>)
```

### Свойства

| Свойство | Тип | Описание |
|----------|-----|----------|
| `panelHeight` | `Ref<number \| null>` | Текущая высота панели |

### Методы

| Метод | Описание |
|-------|----------|
| `init()` | Инициализация (вызвать в `onMounted`) |
| `start(e: MouseEvent)` | Начать изменение размера (на `@mousedown`) |
| `destroy()` | Очистка слушателей (вызвать в `onUnmounted`) |

## 🎯 Пример с ограничениями

```vue
<script setup lang="ts">
import { computed } from "vue";

// Минимум 200px, максимум 600px
const constrainedHeight = computed(() => {
  const height = resizable.panelHeight.value;
  if (!height) return 200;
  return Math.min(Math.max(height, 200), 600);
});
</script>
```

## ⚙️ Требования

- Vue 3
- TypeScript (опционально)

## 📄 Лицензия

MIT
