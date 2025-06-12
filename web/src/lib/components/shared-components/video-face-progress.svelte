<script lang="ts">
  import { videoFaceProgress } from '$lib/stores/video-face-progress.store';

  const percent = $derived(() =>
    $videoFaceProgress ? ($videoFaceProgress.processed / $videoFaceProgress.total) * 100 : 0,
  );
</script>

{#if $videoFaceProgress}
  <div class="fixed bottom-6 start-1/2 -translate-x-1/2 z-50 w-64 rounded-lg border bg-gray-100 p-3 text-sm shadow-md dark:border-immich-dark-gray dark:bg-immich-dark-gray pointer-events-none">
    <p class="mb-2">Processing video faces: frames({$videoFaceProgress.processed}/{$videoFaceProgress.total})</p>
    <div class="h-2 w-full rounded bg-gray-300 dark:bg-immich-dark-gray">
      <div class="h-2 rounded bg-immich-primary transition-all" style={`width: ${percent}%`}></div>
    </div>
  </div>
{/if}
