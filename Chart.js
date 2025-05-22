"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Componente Chart para visualización de datos
const react_1 = __importStar(require("react"));
require("./Chart.css");
const Chart = ({ type, labels, series, title, height = 300, width = '100%', showLegend = true, showGrid = true, className = '' }) => {
    const chartRef = (0, react_1.useRef)(null);
    // Colores predeterminados para series
    const defaultColors = [
        '#1a73e8', // Azul
        '#34a853', // Verde
        '#ea4335', // Rojo
        '#fbbc05', // Amarillo
        '#673ab7', // Púrpura
        '#ff5722', // Naranja
        '#00acc1', // Cian
        '#5f6368' // Gris
    ];
    // Función para renderizar el gráfico (simulada)
    (0, react_1.useEffect)(() => {
        if (chartRef.current) {
            // En una implementación real, aquí se usaría una biblioteca como Chart.js o Recharts
            // Para esta simulación, solo mostraremos un placeholder
            const canvas = document.createElement('canvas');
            canvas.width = typeof width === 'number' ? width : chartRef.current.clientWidth;
            canvas.height = height;
            // Limpiar el contenedor
            while (chartRef.current.firstChild) {
                chartRef.current.removeChild(chartRef.current.firstChild);
            }
            // Añadir el canvas
            chartRef.current.appendChild(canvas);
            // Simulación de renderizado (en implementación real se usaría Chart.js o similar)
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Dibujar fondo
                ctx.fillStyle = '#f9f9f9';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                // Dibujar título
                if (title) {
                    ctx.fillStyle = '#333';
                    ctx.font = 'bold 14px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(title, canvas.width / 2, 20);
                }
                // Simulación de gráfico según tipo
                const chartArea = {
                    top: title ? 40 : 20,
                    right: 20,
                    bottom: 40,
                    left: 50
                };
                const chartWidth = canvas.width - chartArea.left - chartArea.right;
                const chartHeight = canvas.height - chartArea.top - chartArea.bottom;
                // Dibujar ejes
                ctx.strokeStyle = '#ccc';
                ctx.lineWidth = 1;
                // Eje Y
                ctx.beginPath();
                ctx.moveTo(chartArea.left, chartArea.top);
                ctx.lineTo(chartArea.left, canvas.height - chartArea.bottom);
                ctx.stroke();
                // Eje X
                ctx.beginPath();
                ctx.moveTo(chartArea.left, canvas.height - chartArea.bottom);
                ctx.lineTo(canvas.width - chartArea.right, canvas.height - chartArea.bottom);
                ctx.stroke();
                // Dibujar grid
                if (showGrid) {
                    // Grid horizontal
                    const ySteps = 5;
                    for (let i = 0; i <= ySteps; i++) {
                        const y = chartArea.top + (chartHeight / ySteps) * i;
                        ctx.beginPath();
                        ctx.moveTo(chartArea.left, y);
                        ctx.lineTo(canvas.width - chartArea.right, y);
                        ctx.strokeStyle = '#eee';
                        ctx.stroke();
                    }
                    // Grid vertical
                    const xSteps = Math.min(10, labels.length);
                    for (let i = 0; i <= xSteps; i++) {
                        const x = chartArea.left + (chartWidth / xSteps) * i;
                        ctx.beginPath();
                        ctx.moveTo(x, chartArea.top);
                        ctx.lineTo(x, canvas.height - chartArea.bottom);
                        ctx.strokeStyle = '#eee';
                        ctx.stroke();
                    }
                }
                // Dibujar etiquetas del eje X
                ctx.fillStyle = '#666';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                const labelStep = Math.ceil(labels.length / 10); // Mostrar máximo 10 etiquetas
                for (let i = 0; i < labels.length; i += labelStep) {
                    const x = chartArea.left + (chartWidth / (labels.length - 1)) * i;
                    ctx.fillText(labels[i], x, canvas.height - chartArea.bottom + 20);
                }
                // Simulación de datos según tipo de gráfico
                if (type === 'line' || type === 'area') {
                    series.forEach((serie, serieIndex) => {
                        const color = serie.color || defaultColors[serieIndex % defaultColors.length];
                        // Dibujar línea
                        ctx.beginPath();
                        ctx.strokeStyle = color;
                        ctx.lineWidth = 2;
                        // Encontrar valor máximo para escalar
                        const maxValue = Math.max(...serie.data, 0);
                        serie.data.forEach((value, index) => {
                            const x = chartArea.left + (chartWidth / (serie.data.length - 1)) * index;
                            const y = chartArea.top + chartHeight - (value / maxValue) * chartHeight;
                            if (index === 0) {
                                ctx.moveTo(x, y);
                            }
                            else {
                                ctx.lineTo(x, y);
                            }
                        });
                        ctx.stroke();
                        // Si es área, rellenar bajo la línea
                        if (type === 'area') {
                            ctx.lineTo(chartArea.left + chartWidth, canvas.height - chartArea.bottom);
                            ctx.lineTo(chartArea.left, canvas.height - chartArea.bottom);
                            ctx.closePath();
                            ctx.fillStyle = `${color}33`; // Color con transparencia
                            ctx.fill();
                        }
                    });
                }
                else if (type === 'bar') {
                    // Encontrar valor máximo para escalar
                    const allValues = series.flatMap(s => s.data);
                    const maxValue = Math.max(...allValues, 0);
                    const barWidth = chartWidth / (labels.length * series.length + labels.length);
                    series.forEach((serie, serieIndex) => {
                        const color = serie.color || defaultColors[serieIndex % defaultColors.length];
                        serie.data.forEach((value, index) => {
                            const x = chartArea.left + (chartWidth / labels.length) * index + barWidth * serieIndex;
                            const barHeight = (value / maxValue) * chartHeight;
                            const y = canvas.height - chartArea.bottom - barHeight;
                            ctx.fillStyle = color;
                            ctx.fillRect(x, y, barWidth * 0.8, barHeight);
                        });
                    });
                }
                else if (type === 'pie') {
                    // Simplificación de gráfico circular
                    const centerX = chartArea.left + chartWidth / 2;
                    const centerY = chartArea.top + chartHeight / 2;
                    const radius = Math.min(chartWidth, chartHeight) / 2;
                    // Sumar todos los valores
                    const total = series.reduce((sum, serie) => sum + serie.data.reduce((a, b) => a + b, 0), 0);
                    let startAngle = 0;
                    series.forEach((serie, serieIndex) => {
                        const serieTotal = serie.data.reduce((a, b) => a + b, 0);
                        const sliceAngle = (serieTotal / total) * 2 * Math.PI;
                        const color = serie.color || defaultColors[serieIndex % defaultColors.length];
                        ctx.beginPath();
                        ctx.moveTo(centerX, centerY);
                        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
                        ctx.closePath();
                        ctx.fillStyle = color;
                        ctx.fill();
                        startAngle += sliceAngle;
                    });
                }
                // Dibujar leyenda
                if (showLegend && series.length > 0) {
                    const legendY = canvas.height - 15;
                    const legendItemWidth = canvas.width / series.length;
                    series.forEach((serie, index) => {
                        const color = serie.color || defaultColors[index % defaultColors.length];
                        const x = (legendItemWidth * index) + legendItemWidth / 2;
                        // Cuadrado de color
                        ctx.fillStyle = color;
                        ctx.fillRect(x - 30, legendY - 8, 10, 10);
                        // Texto
                        ctx.fillStyle = '#333';
                        ctx.font = '12px Arial';
                        ctx.textAlign = 'left';
                        ctx.fillText(serie.name, x - 15, legendY);
                    });
                }
            }
        }
    }, [type, labels, series, title, height, width, showLegend, showGrid]);
    return (react_1.default.createElement("div", { className: `chart-container ${className}`, ref: chartRef, style: { height: `${height}px`, width: typeof width === 'number' ? `${width}px` : width } },
        react_1.default.createElement("div", { className: "chart-loading" },
            react_1.default.createElement("div", { className: "spinner" }),
            react_1.default.createElement("p", null, "Cargando gr\u00E1fico..."))));
};
exports.default = Chart;
