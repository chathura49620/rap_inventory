package com.example.demo.model;

public class VendorInvoice {
    private int id;
    private String requestId;
    private String total;
    private String invoicedDate;
    private String dueDate;
    private String status;

    public VendorInvoice(int id, String requestId, String total, String invoicedDate, String dueDate, String status) {
        this.id = id;
        this.requestId = requestId;
        this.total = total;
        this.invoicedDate = invoicedDate;
        this.dueDate = dueDate;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public String getInvoicedDate() {
        return invoicedDate;
    }

    public void setInvoicedDate(String invoicedDate) {
        this.invoicedDate = invoicedDate;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
}
