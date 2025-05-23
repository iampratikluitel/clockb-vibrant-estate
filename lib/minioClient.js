const Minio = require("minio");
const https = require('https');
const http = require('http');

const minioClient = new Minio.Client({
  endPoint: "193.203.161.79",
  port: 9001,
  useSSL: false, // Set to true if you're using HTTPS
  accessKey: "bgyanaccelerator",
  secretKey: "bgyanaccelerator",
  region: 'us-east-1',
  transport: {
    maxRetries: 3,
    retryDelay: 1000,
    request: (options, callback) => {
      const transport = options.protocol === 'https:' ? https : http;
      const req = transport.request(options, callback);
      req.on('error', callback);
      return req;
    }
  }
});

// Test function to verify MinIO connection
async function testMinioConnection() {
  try {
    console.log('Testing MinIO connection...');
  

    // First test if we can connect to the server
    const exists = await minioClient.bucketExists('projectestate');
    console.log('Bucket exists:', exists);
    
    if (exists) {
      console.log('Listing objects in bucket...');
      const objects = [];
      const stream = minioClient.listObjects('projectestate', '', true);
      
      stream.on('data', (obj) => {
        if (obj && obj.name) {
          objects.push(obj);
          console.log('Found object:', obj.name);
        }
      });

      await new Promise((resolve, reject) => {
        stream.on('end', resolve);
        stream.on('error', reject);
      });

      console.log(`Found ${objects.length} objects in bucket`);
      
      if (objects.length === 0) {
        console.log('No objects found, creating test documents...');
        await createTestDocuments();
      }
    } else {
      console.log('Bucket does not exist, creating it...');
      await minioClient.makeBucket('projectestate', 'us-east-1');
      console.log('Bucket created successfully');
      await createTestDocuments();
    }
  } catch (error) {
    console.error('MinIO connection test failed:', error);
    if (error.code) {
      console.error('Error code:', error.code);
    }
    if (error.message) {
      console.error('Error message:', error.message);
    }
    if (error.stack) {
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}

async function createTestDocuments() {
  const testDocuments = [
    {
      name: 'quarterly/Q1-2024-Report.pdf',
      content: 'Test quarterly report content'
    },
    {
      name: 'legal/Investment-Agreement.pdf',
      content: 'Test legal document content'
    }
  ];

  for (const doc of testDocuments) {
    try {
      await minioClient.putObject(
        'projectestate',
        doc.name,
        Buffer.from(doc.content),
        {
          'Content-Type': 'application/pdf'
        }
      );
      console.log(`Created test document: ${doc.name}`);
    } catch (error) {
      console.error(`Error creating test document ${doc.name}:`, error);
    }
  }
}

// Run the test immediately
testMinioConnection().catch(error => {
  console.error('Failed to initialize MinIO connection:', error);
});

module.exports = minioClient;
