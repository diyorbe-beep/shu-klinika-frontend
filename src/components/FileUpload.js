import { useState } from 'react';
import { uploadFile } from '../api/upload';
import { Button, CircularProgress, Typography } from '@mui/material';

function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Iltimos, fayl tanlang');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const { data } = await uploadFile(formData);
      onUploadSuccess(data.fileUrl);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Yuklashda xato');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={isUploading}
        sx={{ mt: 1 }}
      >
        {isUploading ? <CircularProgress size={24} /> : 'Yuklash'}
      </Button>
      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </div>
  );
}

export default FileUpload;