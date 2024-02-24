// Import the necessary Camera Kit modules.
import {
  bootstrapCameraKit,
  createMediaStreamSource,
} from '@snap/camera-kit';

(async function() {
  // Bootstrap Camera Kit using your API token.
  const cameraKit = await bootstrapCameraKit({
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzA2NzExNzk4LCJzdWIiOiJhNWQ0ZjU2NC0yZTM0LTQyN2EtODI1Ni03OGE2NTFhODc0ZTR-U1RBR0lOR35mMzBjN2JmNy1lNjhjLTRhNzUtOWFlNC05NmJjOTNkOGIyOGYifQ.xLriKo1jpzUBAc1wfGpLVeQ44Ewqncblby-wYE1vRu0'
  });

  const session = await cameraKit.createSession();
  document.getElementById('canvas').replaceWith(session.output.live);
  const { lenses } = await cameraKit.lensRepository.loadLensGroups(['f6ec2d36-229a-49c7-ba9d-847d7f287515'])
  session.applyLens(lenses[0]);

  let mediaStream = await navigator.mediaDevices.getUserMedia({
    video: { width: 4096, height: 4096, facingMode: 'environment' }
  });

  const source = createMediaStreamSource(mediaStream, { cameraType: 'back' });
  await session.setSource(source);
  session.source.setRenderSize( window.innerWidth,  window.innerHeight);
  session.play();
})();
