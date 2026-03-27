/**
 * Upload Page
 * File upload interface for updating the knowledge base
 * Only accessible after authentication
 */

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadDocument } from '../services/api';
import { Upload, CheckCircle, AlertCircle, FileText, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface UploadedFile {
  name: string;
  size: number;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

// Constants
const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const ALLOWED_EXTENSIONS = ['.pdf', '.docx'];
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  // Validation function
  const validateFile = useCallback((file: File): { valid: boolean; error?: string } => {
    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return {
          valid: false,
          error: 'Only PDF and DOCX files are allowed',
        };
      }
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File size exceeds 25MB limit (${(file.size / (1024 * 1024)).toFixed(2)}MB)`,
      };
    }

    // Check file name
    if (file.name.length > 255) {
      return {
        valid: false,
        error: 'File name is too long',
      };
    }

    return { valid: true };
  }, []);

  // Handle file selection
  const handleFiles = useCallback(async (acceptedFiles: File[]) => {
    setIsDragActive(false);

    if (acceptedFiles.length === 0) {
      toast.error('No files selected');
      return;
    }

    for (const file of acceptedFiles) {
      // Validate file
      const validation = validateFile(file);
      if (!validation.valid) {
        toast.error(`${file.name}: ${validation.error}`);
        continue;
      }

      // Add to files list
      const newFile: UploadedFile = {
        name: file.name,
        size: file.size,
        status: 'uploading',
        progress: 0,
      };

      setFiles((prev) => [...prev, newFile]);

      // Upload file
      try {
        toast.loading(`Uploading ${file.name}...`);

        const result = await uploadDocument(file);

        setFiles((prev) =>
          prev.map((f) =>
            f.name === file.name
              ? {
                  ...f,
                  status: result.success ? 'success' : 'error',
                  progress: result.success ? 100 : 0,
                  error: result.error,
                }
              : f
          )
        );

        if (result.success) {
          toast.success(`${file.name} uploaded successfully`);
        } else {
          toast.error(`${file.name}: ${result.error}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        toast.error(`Failed to upload ${file.name}: ${errorMessage}`);

        setFiles((prev) =>
          prev.map((f) =>
            f.name === file.name
              ? {
                  ...f,
                  status: 'error',
                  error: errorMessage,
                }
              : f
          )
        );
      }
    }
  }, [validateFile]);

  // Dropzone setup
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFiles,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
  });

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  const clearAll = () => {
    setFiles([]);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/3 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-3 sm:px-5 lg:px-6 py-4 sm:py-5 lg:py-6 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Upload size={24} className="sm:w-7 sm:h-7" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Upload Knowledge Base
          </h1>
          <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">Update your knowledge base with PDF and DOCX documents</p>

          {/* Upload Info */}
          <div className="inline-block bg-blue-500/20 border border-blue-500/30 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-blue-200 mb-6 sm:mb-8">
            <span className="font-semibold">Supported formats:</span> PDF, DOCX (Max 25MB per file)
          </div>
        </div>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`mb-6 sm:mb-8 p-8 sm:p-12 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
            isDragActive
              ? 'border-purple-400 bg-purple-500/20'
              : 'border-white/20 bg-white/10 hover:border-white/40 hover:bg-white/15'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center">
            <Upload
              size={36}
              className={`mb-4 transition-all duration-300 sm:w-12 sm:h-12 ${
                isDragActive ? 'text-purple-400 scale-110' : 'text-gray-400'
              }`}
            />
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
              {isDragActive ? 'Drop your files here' : 'Drag and drop files here'}
            </h2>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">or click to select files</p>
            <div className="text-xs sm:text-sm text-gray-400">
              PDF and DOCX files up to 25MB are supported
            </div>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-4 mb-8 max-h-[34vh] overflow-hidden">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                Uploads ({files.length})
              </h2>
              {files.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-3">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="backdrop-blur-md bg-white/10 rounded-xl p-3 sm:p-4 border border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:border-white/30 transition-all duration-300 gap-3"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0 w-full sm:w-auto">
                    <FileText
                      size={20}
                      className={`flex-shrink-0 sm:w-6 sm:h-6 ${
                        file.status === 'success'
                          ? 'text-green-400'
                          : file.status === 'error'
                          ? 'text-red-400'
                          : 'text-blue-400'
                      }`}
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatFileSize(file.size)}
                      </p>

                      {/* Progress Bar */}
                      {file.status === 'uploading' && (
                        <div className="mt-2 w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-full animate-pulse transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          ></div>
                        </div>
                      )}

                      {/* Error Message */}
                      {file.status === 'error' && file.error && (
                        <p className="text-xs text-red-400 mt-1">{file.error}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto justify-end">
                    {file.status === 'success' && (
                      <CheckCircle size={18} className="text-green-400 sm:w-5 sm:h-5" />
                    )}
                    {file.status === 'error' && (
                      <AlertCircle size={18} className="text-red-400 sm:w-5 sm:h-5" />
                    )}
                    {file.status === 'uploading' && (
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    )}

                    <button
                      onClick={() => removeFile(file.name)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X size={18} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success Message */}
        {files.length > 0 && files.every((f) => f.status === 'success') && (
          <div className="p-4 rounded-xl bg-green-500/20 border border-green-500/30 flex items-start gap-3">
            <CheckCircle size={24} className="text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-300 mb-1">Upload Complete!</h3>
              <p className="text-sm text-green-200">
                Your files have been successfully added to the knowledge base. You can now query them.
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {files.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No files uploaded yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Start by dragging and dropping files above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
