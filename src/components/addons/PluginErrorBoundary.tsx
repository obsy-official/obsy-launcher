import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { addonRegistry } from "@/lib/addons/registry";

interface Props {
  addonId: string;
  slotName: string;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class PluginErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      `[PluginErrorBoundary] Error in addon '${this.props.addonId}' at slot '${this.props.slotName}':`,
      error,
      errorInfo,
    );

    addonRegistry.reportAddonCrash(this.props.addonId, error);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="border-destructive/30 bg-destructive/10 text-destructive flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[11px] backdrop-blur-sm"
          title={`Ошибка в аддоне ${this.props.addonId}: ${this.state.error?.message || "Unknown error"}`}
        >
          <AlertCircle className="text-destructive h-3.5 w-3.5 shrink-0" />
          <span className="max-w-[110px] truncate font-medium">
            {this.props.addonId}
          </span>
          <button
            type="button"
            onClick={this.handleRetry}
            className="hover:bg-destructive/20 ml-1 cursor-pointer rounded p-0.5 transition-colors"
            title="Перезагрузить виджет"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
