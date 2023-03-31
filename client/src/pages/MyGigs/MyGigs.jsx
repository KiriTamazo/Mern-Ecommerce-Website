import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../ultis/apiRequest";
import getCurrentUser from "../../ultis/getCurrentUser";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import { TrashIcon } from "@heroicons/react/24/outline";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";
import useScrollLock from "../../hooks/useScrollLock";

const MyGigs = () => {
  const queryClient = useQueryClient();
  const currentUser = getCurrentUser();
  const [show, setShow] = useState(false);
  const [dataId, setDataId] = useState(null);
  const { lockScroll, unlockScroll } = useScrollLock();
  const handleShow = () => {
    setShow(true);
    lockScroll();
  };
  const handleCanCle = () => {
    setShow(false);
    unlockScroll();
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      apiRequest.get(`/gigs?userId=${currentUser?.id}`).then((res) => {
        return res.data;
      }),
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
    setShow(false);
    unlockScroll();
  };

  const mutation = useMutation({
    mutationFn: (id) => {
      return apiRequest.delete(`/gigs/${id}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  return (
    <section className="my-gigs">
      <div className="container">
        <div className="title">
          <h1> My Gigs</h1>
          <Link to="/add" className="add-gig">
            Add Gig
          </Link>
        </div>
        {isLoading ? (
          "Loading..."
        ) : error ? (
          "Something went wrong"
        ) : (
          <>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th aria-expanded="false">Image</th>
                    <th aria-expanded>Title</th>
                    <th>Price</th>
                    <th>Sales</th>
                    <th aria-expanded="false">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((gigs, i) => (
                    <tr key={gigs.id}>
                      <td>
                        <img className="image" src={gigs.image} alt="" />
                      </td>
                      <td aria-expanded className="td-title">
                        {gigs.title}
                      </td>
                      <td>{gigs.price}</td>
                      <td>{gigs.sales}</td>
                      <td aria-expanded="false">
                        <button
                          onClick={() => {
                            handleShow();
                            setDataId(gigs.id);
                          }}
                          className="delete-btn"
                        >
                          <TrashIcon className="delete-icon" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              show={show}
              handleCancle={handleCanCle}
              handleSuccess={() => handleDelete(dataId)}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default MyGigs;
