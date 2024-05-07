import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";
import "./compo.css";

export default function ProductAdd({
  addProductModalSetting,
  handlePageUpdate,
}) {
  const authContext = useContext(AuthContext);
  const [product, setProduct] = useState({
    userId: authContext.user,
    name: "",
    manufacturer: "",
    quantity: "",
    price: "",
    description: "",
  });
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const handleInputChange = (key, value) => {
    setProduct({ ...product, [key]: value });
  };

  const addProduct = () => {
    fetch("http://localhost:4000/api/product/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to add product");
      })
      .then((data) => {
        alert("Product ADDED");
        handlePageUpdate();
        addProductModalSetting();
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="product-add-modal"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        {/* Dialog Transition */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="modal-overlay" />
        </Transition.Child>

        <div className="modal-container">
          <div className="modal-content">
            <div className="modal-header">
              {/* Plus Icon */}
              <div className="modal-icon">
                <PlusIcon className="h-6 w-6 text-blue-400" aria-hidden="true" />
              </div>
              {/* Modal Title */}
              <div className="modal-title">
                <Dialog.Title>Add Product</Dialog.Title>
              </div>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <form action="#">
                {/* Form Inputs */}
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={product.name}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="manufacturer">Brand</label>
                  <input
                    type="text"
                    name="manufacturer"
                    id="manufacturer"
                    value={product.manufacturer}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={product.quantity}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price per piece</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={product.price}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    rows="5"
                    name="description"
                    value={product.description}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  />
                </div>
              </form>
            </div>
            {/* Modal Footer */}
            <div className="modal-footer">
              <button type="button" onClick={addProduct}>Add Product</button>
              <button type="button" onClick={() => addProductModalSetting()} ref={cancelButtonRef}>Cancel</button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
