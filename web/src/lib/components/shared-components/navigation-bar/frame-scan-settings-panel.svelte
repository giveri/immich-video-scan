<script lang="ts">
  import { focusTrap } from '$lib/actions/focus-trap';
  import { preferences } from '$lib/stores/user.store';
  import { videoFrameScanMs } from '$lib/stores/preferences.store';
  import { updateMyPreferences } from '@immich/sdk';
  import {
    notificationController,
    NotificationType,
  } from '$lib/components/shared-components/notification/notification';
  import { t } from 'svelte-i18n';

  interface Props {
    onClose: () => void;
  }

  let { onClose = () => {} }: Props = $props();

  let frameScanMs = $state($preferences?.video?.frameScanMs ?? 1000);

  const save = async () => {
    try {
      const data = await updateMyPreferences({
        userPreferencesUpdateDto: { video: { frameScanMs } },
      });
      $preferences = { ...data };
      videoFrameScanMs.set(frameScanMs);
      notificationController.show({ message: $t('saved_settings'), type: NotificationType.Info });
      onClose();
    } catch (error) {
      notificationController.show({ message: $t('errors.unable_to_update_settings'), type: NotificationType.Error });
    }
  };
</script>

<div
  id="frame-scan-settings-panel"
  class="absolute left-[25px] top-[70px] z-1 w-[min(280px,100vw-50px)] rounded-3xl bg-gray-100 border border-gray-200 shadow-lg dark:border dark:border-light dark:bg-immich-dark-gray text-light"
  use:focusTrap
>
  <form class="p-4 flex flex-col gap-4" on:submit|preventDefault={save}>
    <h2 class="text-lg font-semibold">{$t('frame_scan_settings')}</h2>
    <label class="text-sm font-medium">
      {$t('frame_scan_interval_ms')}
      <input
        type="number"
        min="100"
        step="100"
        bind:value={frameScanMs}
        class="mt-1 w-full rounded-md border p-1 bg-white text-black dark:bg-immich-dark-primary"
      />
    </label>
    <button type="submit" class="self-end px-2 py-1 rounded-md bg-primary text-white">
      {$t('save')}
    </button>
  </form>
</div>
