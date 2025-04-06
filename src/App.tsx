import { lazy, useState } from 'react'
import Dropzone from 'react-dropzone'
import { ApiProxy } from './shared/utils'
import { useAppStateContext } from './store'

const ErrorBoundary = lazy(() => import('@/shared/components/error-boundary/ErrorBoundary'))

interface FileProgress {
  file: File
  uploadedSize: number
  totalSize: number
  uploaded: boolean
}

const apiService = new ApiProxy()

function App() {
  const { error } = useAppStateContext()
  const [files, setFiles] = useState<FileProgress[]>([])

  // Función para manejar los archivos seleccionados
  const handleDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      uploadedSize: 0,
      totalSize: file.size,
      uploaded: false
    }))
    setFiles((prevFiles) => [...prevFiles, ...newFiles])

    // Subir automáticamente cada archivo
    newFiles.forEach(uploadFile)
  }

  // Función para convertir bytes a MB
  const formatSize = (bytes: number): string => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  // Subir un archivo
  const uploadFile = async (fileProgress: FileProgress) => {
    const { file } = fileProgress
    const formData = new FormData()
    formData.append('file', file)

    try {
      await apiService.post('https://jsonplaceholder.typicode.com/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const uploadedSize = progressEvent.loaded
          setFiles((prevFiles) =>
            prevFiles.map((f) => (f.file === file ? { ...f, uploadedSize, uploaded: uploadedSize === f.totalSize } : f))
          )
        }
      })
    } catch (error) {
      alert(`Error al subir el archivo ${file.name}`)
    }
  }

  return (
    <ErrorBoundary pathname={window.location.pathname} error={error}>
      {/* <LoadingBar /> */}

      <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-bold text-center mb-6 text-secondary">Carga de Archivos con Dropzone</h1>

        {/* Componente Dropzone */}
        <Dropzone onDrop={handleDrop} multiple>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
              }`}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-blue-500">¡Suelta los archivos aquí!</p>
              ) : (
                <p className="text-gray-500">Arrastra y suelta los archivos aquí o haz clic para seleccionarlos</p>
              )}
            </div>
          )}
        </Dropzone>

        {/* Lista de archivos seleccionados */}
        {files.length > 0 && (
          <div className="mt-6">
            {files.map(({ file, uploadedSize, totalSize, uploaded }, index) => (
              <div key={index} className="mb-4">
                <div className="text-sm text-gray-700">
                  <p>
                    <strong>Archivo:</strong> {file.name}
                  </p>
                  <p>
                    <strong>Tamaño:</strong> {formatSize(totalSize)}
                  </p>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${(uploadedSize / totalSize) * 100}%` }}></div>
                </div>
                <p className="text-sm text-gray-700 mt-1">
                  {formatSize(uploadedSize)} / {formatSize(totalSize)}{' '}
                  {uploaded && <span className="text-green-500 ml-2">¡Subida completa!</span>}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}

export default App
