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
// Componente Table para visualización de datos tabulares
const react_1 = __importStar(require("react"));
require("./Table.css");
const Table = ({ columns, data, pagination = true, rowsPerPage = 10, actions, onRowClick, className = '', emptyMessage = 'No hay datos disponibles', loading = false }) => {
    // Estado para paginación
    const [page, setPage] = (0, react_1.useState)(0);
    // Estado para ordenamiento
    const [sortConfig, setSortConfig] = (0, react_1.useState)(null);
    // Función para manejar el ordenamiento
    const handleSort = (columnId) => {
        const column = columns.find(col => col.id === columnId);
        if (!column || column.sortable === false) {
            return;
        }
        let direction = 'asc';
        if (sortConfig && sortConfig.key === columnId) {
            direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
        }
        setSortConfig({ key: columnId, direction });
    };
    // Ordenar datos
    const sortedData = react_1.default.useMemo(() => {
        if (!sortConfig) {
            return data;
        }
        return [...data].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [data, sortConfig]);
    // Calcular datos paginados
    const paginatedData = react_1.default.useMemo(() => {
        if (!pagination) {
            return sortedData;
        }
        const startIndex = page * rowsPerPage;
        return sortedData.slice(startIndex, startIndex + rowsPerPage);
    }, [sortedData, pagination, page, rowsPerPage]);
    // Calcular número total de páginas
    const pageCount = Math.ceil(data.length / rowsPerPage);
    // Función para cambiar de página
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    // Renderizar celdas con formato
    const renderCell = (row, column) => {
        const value = row[column.id];
        if (column.format) {
            return column.format(value);
        }
        return value;
    };
    return (react_1.default.createElement("div", { className: `table-container ${className} ${loading ? 'loading' : ''}` },
        loading && (react_1.default.createElement("div", { className: "table-loading-overlay" },
            react_1.default.createElement("div", { className: "spinner" }),
            react_1.default.createElement("p", null, "Cargando datos..."))),
        react_1.default.createElement("table", { className: "data-table" },
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    columns.map(column => (react_1.default.createElement("th", { key: column.id, className: `
                  ${column.sortable !== false ? 'sortable' : ''}
                  ${(sortConfig === null || sortConfig === void 0 ? void 0 : sortConfig.key) === column.id ? `sorted-${sortConfig.direction}` : ''}
                  ${column.align ? `align-${column.align}` : ''}
                `, style: { width: column.width }, onClick: () => handleSort(column.id) },
                        column.label,
                        column.sortable !== false && (react_1.default.createElement("span", { className: "sort-icon" }, (sortConfig === null || sortConfig === void 0 ? void 0 : sortConfig.key) === column.id && sortConfig.direction === 'asc' ? '▲' : '▼'))))),
                    actions && actions.length > 0 && (react_1.default.createElement("th", { className: "actions-column" }, "Acciones")))),
            react_1.default.createElement("tbody", null, paginatedData.length > 0 ? (paginatedData.map((row, rowIndex) => (react_1.default.createElement("tr", { key: rowIndex, onClick: onRowClick ? () => onRowClick(row) : undefined, className: onRowClick ? 'clickable' : '' },
                columns.map(column => (react_1.default.createElement("td", { key: column.id, className: column.align ? `align-${column.align}` : '' }, renderCell(row, column)))),
                actions && actions.length > 0 && (react_1.default.createElement("td", { className: "actions-cell" }, actions.map((action, actionIndex) => (react_1.default.createElement("button", { key: actionIndex, className: "action-button", onClick: (e) => {
                        e.stopPropagation();
                        action.onClick(row);
                    }, disabled: action.disabled ? action.disabled(row) : false },
                    action.icon && react_1.default.createElement("span", { className: "action-icon" }, action.icon),
                    action.label))))))))) : (react_1.default.createElement("tr", { className: "empty-row" },
                react_1.default.createElement("td", { colSpan: columns.length + (actions ? 1 : 0) }, emptyMessage))))),
        pagination && pageCount > 1 && (react_1.default.createElement("div", { className: "pagination" },
            react_1.default.createElement("button", { className: "pagination-button", onClick: () => handlePageChange(0), disabled: page === 0 }, "\u00AB"),
            react_1.default.createElement("button", { className: "pagination-button", onClick: () => handlePageChange(page - 1), disabled: page === 0 }, "\u2039"),
            react_1.default.createElement("span", { className: "pagination-info" },
                "P\u00E1gina ",
                page + 1,
                " de ",
                pageCount),
            react_1.default.createElement("button", { className: "pagination-button", onClick: () => handlePageChange(page + 1), disabled: page >= pageCount - 1 }, "\u203A"),
            react_1.default.createElement("button", { className: "pagination-button", onClick: () => handlePageChange(pageCount - 1), disabled: page >= pageCount - 1 }, "\u00BB")))));
};
exports.default = Table;
