import { useEffect, useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import API from '../api/axios'
import useFormValidation from '../hooks/useFormValidation'
import ReportIcon from '../components/reports/ReportIcon'
import { REPORTS_CATALOG, getReportById } from '../data/reportsCatalog'
import { notifyAdmin } from '../utils/notifyAdmin'
import './ReportOrderPage.css'

const initialForm = {
    name: '',
    email: '',
    phone: '',
    reportType: '',
    dateOfBirth: '',
    birthTime: '',
    birthPlace: '',
    partnerDOB: '',
    partnerBirthTime: '',
    partnerBirthPlace: '',
    additionalInfo: '',
}

const validationRules = {
    name: { required: true, requiredMsg: 'Please enter your name' },
    email: { required: true, email: true },
    reportType: { required: true, requiredMsg: 'Please select a report type' },
    dateOfBirth: { required: true, requiredMsg: 'Please provide your date of birth' },
    birthTime: { required: true, requiredMsg: 'Please provide your birth time' },
    birthPlace: { required: true, requiredMsg: 'Please provide your birth place' },
}

export default function ReportOrderPage() {
    const { reportId } = useParams()
    const urlReport = getReportById(reportId)

    const {
        values,
        errors,
        isSubmitting,
        setIsSubmitting,
        handleChange,
        validate,
        resetForm,
        setValues,
    } = useFormValidation(initialForm, validationRules)

    useEffect(() => {
        if (urlReport) {
            setValues((prev) => ({ ...prev, reportType: urlReport.title }))
        }
    }, [reportId, urlReport, setValues])

    const selectedReport = useMemo(() => {
        const byForm = REPORTS_CATALOG.find((r) => r.title === values.reportType)
        return byForm || urlReport || null
    }, [values.reportType, urlReport])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return

        setIsSubmitting(true)
        try {
            const payload = {
                name: values.name,
                email: values.email,
                phone: values.phone,
                reportType: values.reportType,
                dateOfBirth: values.dateOfBirth,
                birthTime: values.birthTime,
                birthPlace: values.birthPlace,
                partnerDOB: values.partnerDOB || undefined,
                partnerBirthTime: values.partnerBirthTime || undefined,
                partnerBirthPlace: values.partnerBirthPlace || undefined,
                additionalInfo: values.additionalInfo,
            }

            await API.post('/reports', payload)
            toast.success('Report request submitted! You will receive it within 3-5 business days.')
            // Notify admin via Web3Forms (browser-side, independent of backend SMTP)
            notifyAdmin({
                subject: `New Report Request: ${values.reportType}`,
                fields: {
                    Name: values.name,
                    Email: values.email,
                    Phone: values.phone || 'N/A',
                    'Report Type': values.reportType,
                    'Date of Birth': values.dateOfBirth,
                    'Time of Birth': values.birthTime,
                    'Place of Birth': values.birthPlace,
                    'Partner DOB': values.partnerDOB || 'N/A',
                    'Partner Birth Time': values.partnerBirthTime || 'N/A',
                    'Partner Birth Place': values.partnerBirthPlace || 'N/A',
                    'Additional Info': values.additionalInfo || 'None',
                },
            })
            resetForm()
            setValues({ ...initialForm, reportType: urlReport.title })
        } catch (err) {
            const errorMessage =
                err?.response?.data?.error ||
                err?.response?.data?.errors?.[0]?.message ||
                'Failed to submit report request. Please try again.'
            toast.error(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!urlReport) {
        return <Navigate to="/reports" replace />
    }

    return (
        <div className="report-order-page page-wrapper">
            <div className="page-header report-order-header">
                <h1>
                    Get <span className="gold-text">Your Report</span>
                </h1>
                <p>Fill your details once. Change the report type anytime — the preview updates instantly.</p>
                <p className="report-order-back">
                    <Link to="/reports">← Back to Reports</Link>
                </p>
            </div>

            <section className="section report-order-section">
                <div className="container report-order-layout">
                    <form className="glass-panel report-order-form" onSubmit={handleSubmit}>
                        <div className="ro-form-head">
                            <div>
                                <h2>Your Details</h2>
                                <p className="ro-form-sub">Accurate details help us prepare a precise report.</p>
                            </div>
                            {selectedReport && (
                                <div className="ro-form-chip" aria-label="Selected report">
                                    <span className="ro-form-chip__label">Selected</span>
                                    <span className="ro-form-chip__value">{selectedReport.title}</span>
                                </div>
                            )}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="ro-name">
                                    Full Name *
                                </label>
                                <input
                                    id="ro-name"
                                    className="form-input"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                />
                                {errors.name && <p className="form-error">{errors.name}</p>}
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="ro-email">
                                    Email Address *
                                </label>
                                <input
                                    id="ro-email"
                                    className="form-input"
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                />
                                {errors.email && <p className="form-error">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="ro-phone">
                                    Phone Number (optional)
                                </label>
                                <input
                                    id="ro-phone"
                                    className="form-input"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="ro-reportType">
                                    Report Type *
                                </label>
                                <select
                                    id="ro-reportType"
                                    className="form-select"
                                    name="reportType"
                                    value={values.reportType}
                                    onChange={handleChange}
                                >
                                    <option value="">Choose a report...</option>
                                    {REPORTS_CATALOG.map((r) => (
                                        <option key={r.id} value={r.title}>
                                            {r.title}
                                        </option>
                                    ))}
                                </select>
                                {errors.reportType && <p className="form-error">{errors.reportType}</p>}
                            </div>
                        </div>

                        <h3>Birth Details</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="ro-dob">
                                    Date of Birth *
                                </label>
                                <input
                                    id="ro-dob"
                                    className="form-input"
                                    name="dateOfBirth"
                                    type="date"
                                    value={values.dateOfBirth}
                                    onChange={handleChange}
                                />
                                {errors.dateOfBirth && <p className="form-error">{errors.dateOfBirth}</p>}
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="ro-birthTime">
                                    Time of Birth *
                                </label>
                                <input
                                    id="ro-birthTime"
                                    className="form-input"
                                    name="birthTime"
                                    type="time"
                                    value={values.birthTime}
                                    onChange={handleChange}
                                />
                                {errors.birthTime && <p className="form-error">{errors.birthTime}</p>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="ro-birthPlace">
                                Place of Birth *
                            </label>
                            <input
                                id="ro-birthPlace"
                                className="form-input"
                                name="birthPlace"
                                value={values.birthPlace}
                                onChange={handleChange}
                                placeholder="City, Country"
                            />
                            {errors.birthPlace && <p className="form-error">{errors.birthPlace}</p>}
                        </div>

                        <h3>Partner Details (for compatibility reports)</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="ro-partner-dob">
                                    Partner Date of Birth
                                </label>
                                <input
                                    id="ro-partner-dob"
                                    className="form-input"
                                    name="partnerDOB"
                                    type="date"
                                    value={values.partnerDOB}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="ro-partner-time">
                                    Partner Time of Birth
                                </label>
                                <input
                                    id="ro-partner-time"
                                    className="form-input"
                                    name="partnerBirthTime"
                                    type="time"
                                    value={values.partnerBirthTime}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="ro-partner-place">
                                Partner Place of Birth
                            </label>
                            <input
                                id="ro-partner-place"
                                className="form-input"
                                name="partnerBirthPlace"
                                value={values.partnerBirthPlace}
                                onChange={handleChange}
                                placeholder="City, Country"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="ro-additional">
                                Additional Information
                            </label>
                            <textarea
                                id="ro-additional"
                                className="form-textarea"
                                name="additionalInfo"
                                value={values.additionalInfo}
                                onChange={handleChange}
                                placeholder="Share any specific questions, focus areas, or background you'd like us to consider..."
                                rows={4}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary report-order-submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Processing...' : 'Buy Now'}
                        </button>
                    </form>

                    <aside className="report-order-aside">
                        {selectedReport && (
                            <article className="ro-preview-card" key={selectedReport.id}>
                                <div className="ro-preview-card__top">
                                    <span className="ro-preview-kicker">Order Summary</span>
                                    <span className="ro-preview-price">{selectedReport.price}</span>
                                </div>
                                <div className="ro-preview-card__media">
                                    <img src={selectedReport.image} alt={selectedReport.title} className="ro-preview-card__img" />
                                    <span className="ro-preview-card__badge">
                                        <ReportIcon iconKey={selectedReport.iconKey} />
                                    </span>
                                </div>
                                <h3 className="ro-preview-card__title">{selectedReport.title}</h3>
                                <p className="ro-preview-card__desc">{selectedReport.desc}</p>
                                <div className="ro-preview-card__meta">
                                    <span>Delivery: 3–5 days</span>
                                    <span>Format: PDF</span>
                                </div>
                            </article>
                        )}
                        <div className="glass-panel ro-preview-notes">
                            <h4>What you will receive</h4>
                            <ul>
                                <li>Detailed PDF report prepared by experienced astrologers</li>
                                <li>Practical remedies and guidance tailored to your chart</li>
                                <li>Timeline of key life events and planetary periods</li>
                                <li>Follow-up email support for report clarifications</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    )
}
