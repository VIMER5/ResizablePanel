import { ref, type Ref } from "vue";

class ResizablePanel {
  private panel: Ref;
  public panelHeight = ref<number | null>(null);
  private isResizing = ref<boolean>(false);
  private startY = ref(0);
  private startHeight = ref(0);

  constructor(panel: Ref) {
    this.panel = panel;
    this.onResize = this.onResize.bind(this);
    this.stopResize = this.stopResize.bind(this);
  }
  init() {
    if (this.panel.value) {
      this.panelHeight.value = this.panel.value.offsetHeight;
    }
  }
  start(e: MouseEvent) {
    if (this.panel.value) {
      this.isResizing.value = true;
      this.panelHeight.value = this.panel.value.offsetHeight;
      this.startY.value = e.clientY;
      this.startHeight.value = this.panel.value.offsetHeight;

      document.addEventListener("mousemove", this.onResize);
      document.addEventListener("mouseup", this.stopResize);
    }
  }
  private onResize(e: MouseEvent) {
    if (!this.isResizing.value) return;
    if (!this.panel.value) return;
    const newHeight = this.startHeight.value + (e.clientY - this.startY.value);
    this.panelHeight.value = newHeight;
  }
  private stopResize() {
    this.isResizing.value = false;
    this.destroy();
  }
  destroy() {
    document.removeEventListener("mousemove", this.onResize);
    document.removeEventListener("mouseup", this.stopResize);
  }
}

export default ResizablePanel;
