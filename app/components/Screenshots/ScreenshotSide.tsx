import { Button, Empty } from "antd";
import React, { useCallback, useState } from "react";
import Api from "../../utils/Axios";
import DetailModal from "./DetailModal";
import Screenshot from "./Screenshot";
import DeleteScreenshotModal from "../Modals/DeleteScreenshotModal";

export default function ScreenshotSide({ screenshots: screenshotsArray, meta: metaObject, filters, onRefresh, userRole }) {

  const [loading, setLoading] = useState(false);
  const [modal, showModal] = useState(false);
  const [screenshots, setScreenshots] = useState(screenshotsArray);
  const [meta, setMeta] = useState(metaObject);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState(undefined);

  const handleScreenshotShow = (item) => {
    setSelectedScreenshot(item);
    showModal(true);
  };

  const handleLoadMore = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { data, meta: paginateResult } } = await Api.Post(meta?.next_page, {
        filters
      })
      setScreenshots((prev) => [...prev, ...data]);
      setMeta(paginateResult)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }
  }, [meta, filters])

  const handleSlider = useCallback((type) => {
    const index = screenshots.findIndex(item => item.id === selectedScreenshot?.id);

    if (index > -1) {
      let newScreenshot;
      if (type === 'next') {
        newScreenshot = screenshots[index + 1];
      } else {
        newScreenshot = screenshots[index - 1];
      }
      if (newScreenshot) {
        setSelectedScreenshot(newScreenshot)
      }
    }
  }, [selectedScreenshot, screenshots])

  const handleScreenshotDelete = useCallback((screenshot) => {
    setSelectedScreenshot(screenshot)
    setShowDeleteModal(true);
  }, [])

  const handleDeleteModalClose = useCallback((refresh) => {
    if (refresh) {
      onRefresh()
    }
    setSelectedScreenshot(undefined);
    setShowDeleteModal(false);
  }, [onRefresh])

  return (
    <div>
      <div className={`grid grid-cols-2 gap-2 ${userRole === 'admin' ? 'xl:grid-cols-3' : 'xl:grid-cols-4'}`}>
        {
          screenshots.map((screenshot) => (
            <Screenshot
              key={screenshot.id}
              screenshot={screenshot}
              onClick={() => handleScreenshotShow(screenshot)}
              onDelete={handleScreenshotDelete}
            />
          ))
        }

        {
          screenshots.length === 0 && <Empty description="No Screenshot captured" className={userRole === 'admin' ? 'col-span-3' : 'col-span-4'} />
        }

        <DetailModal
          onClose={() => showModal(false)}
          open={modal}
          screenshot={selectedScreenshot}
          onNext={() => handleSlider('next')}
          onPrev={() => handleSlider('prev')}
        />

        <DeleteScreenshotModal
          open={showDeleteModal}
          onClose={handleDeleteModalClose}
          screenshot={selectedScreenshot}
        />

      </div>
      {meta.next_page && (
        <div className='flex justify-center mt-2'>
          <Button
            type='primary'
            className='bg-primary font-poppins mx-auto'
            onClick={handleLoadMore}
            loading={loading}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
