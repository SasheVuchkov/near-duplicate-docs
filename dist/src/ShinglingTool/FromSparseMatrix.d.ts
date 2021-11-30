import SparseMatrix from "./SparseMatrix";
export default interface FromSparseMatrix<T> {
    fromSparseMatrix(matrix: SparseMatrix): T;
}
