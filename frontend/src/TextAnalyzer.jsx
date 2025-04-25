import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material';
import { analyzeText, cleanText } from './api';

function TextAnalyzer() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await analyzeText(text);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze text. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClean = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await cleanText(text);
      setText(result.content);
      setAnalysis(null);
    } catch (err) {
      setError('Failed to clean text. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cleaned_text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Input Text
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here to analyze for watermarks..."
          variant="outlined"
        />
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleAnalyze}
            disabled={loading || !text.trim()}
          >
            {loading ? <CircularProgress size={24} /> : 'Analyze'}
          </Button>
          <Button
            variant="outlined"
            onClick={handleClean}
            disabled={loading || !text.trim()}
          >
            Clean Text
          </Button>
          <Button
            variant="outlined"
            onClick={handleDownload}
            disabled={!text.trim()}
          >
            Download
          </Button>
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {analysis && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Analysis Results
          </Typography>
          {analysis.watermarks.length === 0 ? (
            <Alert severity="success">
              No watermarks detected in the text.
            </Alert>
          ) : (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Found {analysis.watermarks.length} watermark characters:
              </Typography>
              <List>
                {analysis.watermarks.map((mark, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${mark.unicode_name} (${mark.character})`}
                      secondary={`Position: ${mark.position}`}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Paper>
      )}
    </Box>
  );
}

export default TextAnalyzer; 